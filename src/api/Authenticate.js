import User from '../entities/User';
import {UrlStore} from "../stores/UrlStore";

/**
 * @return {undefined}
 */
async function Login(identifier, password) {

    let response = await fetch(`${UrlStore.MAIN_URL}/auth/local`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: identifier,
                password: password
            })
        });
    if (response.status >= 200 && response.status < 300) {
        let data = await response.json();
        return data;
    } else return undefined;
}


async function Register(username, email, password, name, surname) {
    let response = await fetch(`${UrlStore.MAIN_URL}/auth/local/register`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                name: name,
                surname: surname
            })
        });
    if (response.status >= 200 && response.status < 300){
        return true;
    } else {
        return false;
    }

}

export {
    Login,
    Register
}