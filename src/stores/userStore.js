export class UserStore {
    user = {};

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