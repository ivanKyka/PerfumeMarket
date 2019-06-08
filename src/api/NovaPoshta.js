import {City} from "../entities/City";
import {PostOffice} from "../entities/PostOffice";

export async function getCitiesByName(name) {
    let response = await fetch(`https://api.novaposhta.ua/v2.0/json/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{
                 "modelName": "Address",
                    "calledMethod": "searchSettlements",
                    "methodProperties": {
                        "CityName": "${name}",
                        "Limit": 50
                    }
                }`
    });
    let data = await response.json();
    return data.data[0].Addresses.map(elem => new City(elem));
}

export async function getPostOffices(ref) {
    let response = await fetch(`https://api.novaposhta.ua/v2.0/json/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{
                    "modelName": "AddressGeneral",
                        "calledMethod": "getWarehouses",
                        "methodProperties": {
                    "CityRef":"${ref}"
                    }
                }`
    });
    let data = await response.json();
    return data.data.map(elem => new PostOffice(elem));
}

