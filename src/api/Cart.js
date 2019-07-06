import {UrlStore} from "../stores/UrlStore";
import {getCookie} from "../controllers/Cookies";

/**
 * @return {boolean}
 */
export async function ModifyCart(cartBody) {

    let response = await fetch(`${UrlStore.MAIN_URL}/carts/me`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${getCookie('jwt')}`

            },
            body: JSON.stringify({
                body: cartBody
            })
        });
    return response.status >= 200 && response.status < 300;
}

/**
 * @return {boolean}
 */
export async function GetCart() {

    let response = await fetch(`${UrlStore.MAIN_URL}/carts/me`,
        {
            headers: {
                "authorization": `Bearer ${getCookie('jwt')}`
            },
        });
    if (response.status >= 200 && response.status < 300){
        return await response.json();
    }
    else return false;
}


/**
 * @return {boolean}
 */
export async function ClearCart() {

    let response = await fetch(`${UrlStore.MAIN_URL}/carts/me`,
        {
            method: 'DELETE',
            headers: {
                "authorization": `Bearer ${getCookie('jwt')}`
            },
        });
    return (response.status >= 200 && response.status < 300);
}

