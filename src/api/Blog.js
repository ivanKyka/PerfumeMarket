import {UrlStore} from "../stores/UrlStore";

export async function getCount() {
    // let response = await fetch(`${UrlStore.MAIN_URL}/blogs/count`);
    // let data = 0;
    // if (response.status === 200)
    //     data = await response.json();
    // else return 0;
    // return data.count;
    return 5;
}