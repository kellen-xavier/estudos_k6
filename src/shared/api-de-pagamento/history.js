import { check } from 'k6';
import http from 'k6/http';

export default function (token) {
    const response = http.get(
        // eslint-disable-next-line no-undef
        `${ __ENV.SERVER }/v2/payment/history`,
        {
            headers: {
                'Authorization': `Bearer ${ token }`,
                'content-type': "application/json",
                'accept': "application/json",
            },
        },
    );

    check(response, {
        [`${ Date.now() }: Payment history response was received`]: (response) =>
            response.status === 200 &&
            response.json('payments') !== undefined,
    });

    return response.json('payments');
}
