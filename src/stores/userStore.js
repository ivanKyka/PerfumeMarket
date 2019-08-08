import {observable, action} from "mobx";

export class UserStore {

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

}