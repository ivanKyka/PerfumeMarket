import {UrlStore} from "../stores/UrlStore";
import {deleteCookie, getCookie, setCookie} from "../controllers/Cookies";

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
        setCookie('jwt', data.jwt);
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
        let data = await response.json();
        console.log(data);
        setCookie('jwt', data.jwt);
        return true;
    } else {
        return false;
    }

}

 function Logout() {
    setCookie('jwt','',{expires: 0});
    console.log(getCookie('jwt'));
}

export {
    Login,
    Register,
    Logout
}