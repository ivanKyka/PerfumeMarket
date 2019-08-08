export default class User {

    getWishlist = (() => {
        return this.wishlist;
    }).bind(this);
    setWishlist = ((list) => {
        this.wishlist = list;
    }).bind(this);

    constructor(obj) {
        this.id = obj._id;
        this.username = obj.username;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.email;
        this.provider = obj.provider;
        this.confirmed = obj.confirmed;
        this.blocked = obj.blocked;
        this.role = obj.role;
        this.orders = obj.orders;
        this.thirdname = obj.thirdname;
        this.birthday = obj.birthday;
        this.adress = {};
        this.adress.cityName = obj.adress.cityName;
        this.adress.postOfficeName = obj.adress.postOfficeName;
        this.adress.postOfficeCode = obj.adress.postOfficeCode;
        this.wishlist = obj.wishlist;
    }
}