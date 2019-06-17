export class UserStore {
    user = {};

    setUser = (user => {
        this.user = user;
    }).bind(this);

    getUser =  (() => {
        return(this.user);
    }).bind(this);
}