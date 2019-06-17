import {UrlStore} from "../stores/UrlStore";

export async function categoryTree() {
    let response = await fetch(`${UrlStore.MAIN_URL}/categories/tree/without`);
    if (response.status === 200) {
        let data = await response.json();
        return data.map(el => transformTree(el));
    }
    else return []
}

function transformTree(obj){
    if (obj.children !== undefined)
    return{
        label: obj.label,
        id: obj.key,
        items: obj.children.map(a => transformTree(a))
    };
    else return {
        id: obj.key,
        label: obj.label
    }
}