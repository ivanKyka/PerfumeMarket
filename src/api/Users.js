import {UrlStore} from "../stores/UrlStore";
import {getCookie} from "../controllers/Cookies";
import User from "../entities/User";

export async function me() {
    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${getCookie('jwt')}`
            }
        });
    if (response.status === 200) {
        let data = await response.json();
        return new User(data);
    }
    return false
}

export async function changeUserData(data) {
    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${getCookie('jwt')}`
        },
        body: JSON.stringify(data)
    });
    return response.status === 200;
}
