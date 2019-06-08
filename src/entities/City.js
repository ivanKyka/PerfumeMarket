export class City {
    constructor(data){
        this.Present =  data.Present;
        this.Warehouses =  data.Warehouses;
        this.MainDescription =  data.MainDescription;
        this.Area =  data.Area;
        this.Region =  data.Region;
        this.SettlementTypeCode =  data.SettlementTypeCode;
        this.Ref =  data.Ref;
        this.DeliveryCity =  data.DeliveryCity;
        this.StreetsAvailability =  data.StreetsAvailability;
        this.ParentRegionTypes =  data.ParentRegionTypes;
        this.ParentRegionCode =  data.ParentRegionCode;
        this.RegionTypes =  data.RegionTypes;
        this.RegionTypesCode =  data.RegionTypesCode;
    }
}

//"Present": "м. Київ, Київська обл.",
//                     "Warehouses": 636,
//                     "MainDescription": "Київ",
//                     "Area": "Київська",
//                     "Region": "",
//                     "SettlementTypeCode": "м.",
//                     "Ref": "e718a680-4b33-11e4-ab6d-005056801329",
//                     "DeliveryCity": "8d5a980d-391c-11dd-90d9-001a92567626",
//                     "StreetsAvailability": true,
//                     "ParentRegionTypes": "область",
//                     "ParentRegionCode": "обл.",
//                     "RegionTypes": "",
//                     "RegionTypesCode": ""