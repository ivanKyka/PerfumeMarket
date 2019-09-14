//To understand recursion, see the bottom of this file

import {action, computed, observable, toJS} from "mobx";
import {ModifyCart, GetCart} from '../api/Cart';

export  class Cart {


    @observable
    items = [];
    @observable
    totalPrice = 0;

    @action
    getElemFromCart = (id => {
        return(this.items.filter(a => {
            if (a.product.id === id) return a;
        })[0]);
    }).bind(this);

    getAll = (() => {
        return toJS(this.items);
    }).bind(this);

    saveCart = (() => {
        window.localStorage.setItem('cart',JSON.stringify(this.items));
    }).bind(this);

    isCartHasElem  = (id => {
        return !!this.items.find(e => {
            if (e.product.id === id) return e;
        },this)
    }).bind(this);
    
    @action
    removeFromCart = ((id) => {
        this.items = this.items.filter(el => {
            if (el.product.id !== id) return el;
        });
        this.saveCart();
        ModifyCart(this.items);
    }).bind(this);
    
    @action
    addToCart = ((elem,count) => {
        if (this.isCartHasElem(elem.id)){
            count = count + this.getElemFromCart(elem.id).count;
            this.removeFromCart(elem.id);
        }
        this.items.push({
            product: elem,
            count: count
        });
        this.saveCart();
        ModifyCart(this.items);
    }).bind(this);

    @action
    clearCart = (() => {
        this.items.length = 0;
        this.totalPrice = 0;
        this.saveCart();
        ModifyCart(this.items);
    }).bind(this);

    loadCart = (() => {
        try{
            JSON.parse(window.localStorage.getItem('cart')).forEach(a => this.items.push(a));
        }catch (e) {
//            Oh crap, we should do something
//            ...
//            ...
//            ...
//            LET'S CATCH THIS F**KING DRAGON!!!


//            <>=======()
//            (/\___   /|\\          ()==========<>_
//                  \_/ | \\        //|\   ______/ \)
//                    \_|  \\      // | \_/
//                      \|\/|\_   //  /\/
//                       (oo)\ \_//  /
//                      //_/\_\/ /  |
//                     @@/  |=\  \  |
//                          \_=\_ \ |
//                            \==\ \|\_
//                         __(\===\(  )\
//                        (((~) __(_/   |
//                             (((~) \  /
//                             ______/ /
//                             '------'

        }
    }).bind(this);
    
    @action
    getCartFromServer = ((initialValue = []) => {
        GetCart().then(data => {
            if (data) {
                this.items.length = 0;
                this.totalPrice = 0;
                this.items = initialValue;
                data.body.forEach(elem => {
                    if (!this.isCartHasElem(elem.product.id))
                    this.items.push(elem);
                });
                window.localStorage.setItem('cart',JSON.stringify(data.body));
                ModifyCart(this.items);
            }
        })
    });

    @computed get Total() {
        console.log(toJS(this.items));
        return toJS(this.items).reduce((acc, el) => {
            if (el.product.avaliable)
                return acc + el.product.price * el.count;
            else return acc;
        },0)
    }

    @computed
    get sizeOfCart() {
        return this.items.length;
    }

    @action
    setCount(id, count) {
        this.items = this.items.map(el => {
            if (el.product.id === id) el.count = count;
            return el;
        });
        this.saveCart();
        ModifyCart(this.items);
    };

    @action
    mergeCart = (() => {
        this.getCartFromServer(this.getAll());
    }).bind(this);
}


//To understand recursion, see the top of this file