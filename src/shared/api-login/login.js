import { check } from 'k6';
import http from 'k6/http';

export default function (username, password) {
    const response = http.post(
        // eslint-disable-next-line no-undef
        `${ __ENV.SERVER }/login-new`,
        JSON.stringify({
            username,
            password,
        }),
        {
            headers: {
                'content-type': "application/json",
                'accept': "application/json",
            },
        },
    );

    check(response, {
        [`${ username } has logged in`]: (response) => response.status === 200 &&
            response.json('token') !== undefined,
    });

    return response.json('token');
}
