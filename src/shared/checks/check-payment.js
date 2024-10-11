import { check, sleep } from 'k6';
import history from '../api-payment-hub/history.js';

export default function (token, lastPayment, status) {
    let lastPaymentId = 0;

    if (lastPayment !== undefined) {
        lastPaymentId = lastPayment.fin_sale_id;
    }

    let attempt = 1;

    do {
        sleep(6);
        // eslint-disable-next-line prefer-destructuring
        const nextPayment = history(token)[0];

        if(nextPayment.fin_sale_id > lastPaymentId && nextPayment.status !== "pending") {
            check(nextPayment, {
                [`${ nextPayment.fin_sale_id } has been paid`]: (nextPayment) =>
                    nextPayment.fin_sale_id > lastPaymentId &&
                    nextPayment.status === status,
            });

            break;
        }

        attempt++;

    } while (attempt !== 3);

    return attempt;
}
