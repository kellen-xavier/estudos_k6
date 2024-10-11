import { sleep, check } from 'k6';
import http from 'k6/http';
import { Trend, Rate } from 'k6/metrics';

const p80Latency = new Trend('p80_latency');
const p90Latency = new Trend('p90_latency');
const p95Latency = new Trend('p95_latency');
const customMetric = new Trend('custom_metric');
const errorRate = new Rate('error_rate');

const users = JSON.parse(open('./../users/users.json'));

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // Menos de 1% de falhas nas requisições HTTP
        http_req_duration: ['p(90)<600', 'p(95)<1000'], // 90% das requisições < 600ms, 95% < 1000ms
        'p80_latency': ['p(80)<500'], // 80% das requisições com latência < 500ms
        'p95_latency': ['p(95)<1200'], // 95% das requisições com latência < 1200ms
        'error_rate': ['rate<0.05'], // Menos de 5% de erro aceitável
    },
    stages: [
        { duration: '15s', target: 6 },  // 15 segundos com 6 usuários
        { duration: '1m', target: 20 },  // 1 minuto com 20 usuários
        { duration: '30s', target: 50 }, // 30 segundos com 50 usuários
    ],
};

export default function () {
    const index = Math.floor(Math.random() * users.length);
    const user = users[index];
    const response = http.post(
        `${__ENV.SERVER}/login-new`,
        JSON.stringify({
            username: user.username,
            password: user.password,
        }),
        {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
        },
    );

    const latency = response ? response.timings.duration : 0;

    p80Latency.add(latency);
    p90Latency.add(latency);
    p95Latency.add(latency);
    customMetric.add(latency);

    errorRate.add(response && response.status !== 200);

    check(response, {
        'Login response code is 200': (r) => r.status === 200,
        'Login check token present': (r) => r.json('token') !== undefined,
    });

    const minWaitTime = parseInt(__ENV.MIN_WAIT_TIME) || 1;
    const maxWaitTime = parseInt(__ENV.MAX_WAIT_TIME) || 3;
    const waitTime = Math.floor(Math.random() * (maxWaitTime - minWaitTime + 1)) + minWaitTime;
    sleep(waitTime);
}
