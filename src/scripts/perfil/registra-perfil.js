import registerUser from '../shared/api-profile/register.js';
import checkRegistration from '../../shared/checks/check-registration.js';

export default function (username, password) {
    const email = `${ username }@mailinator.com`;

    registerUser({
        username,
        password,
        email,
    });

    checkRegistration(email);
}
