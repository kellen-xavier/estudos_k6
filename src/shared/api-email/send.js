import { check } from 'k6';
import http from 'k6/http';

export default function (emailType, emailData) {
    const response = http.post(
        // eslint-disable-next-line no-undef
        `${ __ENV.SERVER }/internals/email/${ emailType }`,
        emailData,
    );

    check(response, {
        'response code was 202': (response) => response.status === 202,
    });
};
