import {UrlStore} from "../stores/UrlStore";

export async function categoryTree(isAddUrl=false) {
    let response = await fetch(`${UrlStore.MAIN_URL}/categories/tree/without`);
    if (response.status === 200) {
        let data = await response.json();
        if (isAddUrl)
            return data.map(el => transformTreeAddUrl(el));
        else
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
        label: obj.label,
        lastChild: true,
        url: `/catalog/${obj.key}`,
        command: (event) => {
            console.log(event.item);
        }
    }
}
function transformTreeAddUrl(obj){
    if (obj.children !== undefined)
    return{
        label: obj.label,
        id: obj.key,
        items: obj.children.map(a => transformTreeAddUrl(a)),
        url: `/catalog/${obj.key}`
    };
    else return {
        id: obj.key,
        label: obj.label,
        lastChild: true,
        url: `/catalog/${obj.key}`
    }
}