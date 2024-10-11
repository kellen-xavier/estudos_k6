import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check } from 'k6';
import http from 'k6/http';

export default function (paymentData, token) {
    paymentData.taxId = "97444481907"; //numero aleatorio gerado para exemplo

    const response = http.post(
        // eslint-disable-next-line no-undef
        `${ __ENV.SERVER }/v2/payment/create-payment`,
        JSON.stringify(paymentData),
        {
            headers: {
                'Authorization': `Bearer ${ token }`,
                'content-type': "application/json",
                'accept': "application/json",
                'Idempotency-Key': uuidv4(),
            },
        },
    );

    check(response, {
        [`${ Date.now() }: Payment for ${ paymentData.variantUuid } was created`]: (response) =>
            response.status === 201 &&
            response.json('externalIdentifier') !== undefined,
    });
}
