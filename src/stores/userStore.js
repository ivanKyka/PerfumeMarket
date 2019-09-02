import {observable, action, computed} from "mobx";

export class UserStore {

    constructor(props){
        this.getUser = this.getUser.bind(this);
        this.isLogged = this.isLogged.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    @observable
    user = {};

    @action
    setUser = (user => {
        this.user = user;
    }).bind(this);

    getUser =  (() => {
        return(this.user);
    }).bind(this);

    isLogged = (() => {
        return (typeof this.user._id !== 'undefined');
    }).bind(this);

    @computed
    get userId() {
        return this.user._id;
    }
}