import { check } from 'k6';
import http from 'k6/http';

export default function (token) {
    const data = {
        cardToken: "tokenaqui",
        providerExternalIdentifier: "gerafa130-keey-de-exemplo-paraTestef2fc2",
    };

    const response = http.post(
        // eslint-disable-next-line no-undef
        `${ __ENV.SERVER }/v2/payment/tokenization-credit-card`,
        JSON.stringify(data),
        {
            headers: {
                'Authorization': `Bearer ${ token }`,
                'content-type': "application/json",
                'accept': "application/json",
            },
        },
    );

    check(response, {
        [`${ Date.now() }: Credit card was tokenized`]: (response) =>
            response.status === 201 &&
            response.json('externalIdentifier') !== undefined,
    });

    return response.json('externalIdentifier');
}
