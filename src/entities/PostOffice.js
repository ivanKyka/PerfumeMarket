export class PostOffice {
    constructor(data){
        this.SiteKey = data.SiteKey;
        this.Description = data.Description;
        this.DescriptionRu = data.DescriptionRu;
        this.ShortAddress = data.ShortAddress;
        this.ShortAddressRu = data.ShortAddressRu;
        this.Phone = data.Phone;
        this.Number = data.Number;
        this.CityDescription = data.CityDescription;
        this.CityDescriptionRu = data.CityDescriptionRu;
        this.Longitude = data.Longitude;
        this.Latitude = data.Latitude;
    }
}
