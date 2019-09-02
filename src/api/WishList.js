import {UrlStore} from "../stores/UrlStore";
import {getCookie} from "../controllers/Cookies";



export async function GetWishList() {

    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`,
        {
            headers: {
                "Authorization": `Bearer ${getCookie('jwt')}`
            },
        });
    if (response.status >= 200 && response.status < 300){
        let data = await response.json();
        return data.wishlist;
    }
    else return false;
}


export async function AddToWishList(id) {
    let wishlist = await GetWishList();
    if (!wishlist.includes(id))
        {
        wishlist.push(id);
        let response = await fetch(`${UrlStore.MAIN_URL}/users/me`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('jwt')}`

                },
                body: JSON.stringify({
                    wishlist: wishlist
                })
            });

        if (response.status >= 200 && response.status < 300)
            {
                let data = await response.json();
                return data.wishlist;
            }
        return false;
    }
}

export async function RemoveFromWishList(id) {
    let wishlist = await GetWishList();
    wishlist = wishlist.filter(el => {
        if (el !== id) return el;
    });
    let response = await fetch(`${UrlStore.MAIN_URL}​/users/me`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('jwt')}`

            },
            body: JSON.stringify({
                wishlist: wishlist
            })
        });


    if (response.status >= 200 && response.status < 300)
    {
        let data = await response.json();
        return data.wishlist;
    }
    return false;
}




export async function ClearWishList() {

    let response = await fetch(`${UrlStore.MAIN_URL}​/users​/me`,
        {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${getCookie('jwt')}`
            },
            body: `[]`
        });
    return (response.status >= 200 && response.status < 300);
}

