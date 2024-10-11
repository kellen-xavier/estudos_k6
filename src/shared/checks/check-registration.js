import { check, sleep } from 'k6';
import emailExistence from '../api-auth/email-existence.js';

export default function (email) {
    let attempt = 0;
    const timeout = 60;
    const step = 3;

    while (attempt < timeout) {
        const emailExistenceResponse = emailExistence(email);

        if (emailExistenceResponse.status === 200) {
            break;
        }

        sleep(step);

        attempt += step;
    };

    check(attempt, {
        [`User ${ email } has been registered`]: (response) => response < timeout,
    });

    sleep(3);
}
