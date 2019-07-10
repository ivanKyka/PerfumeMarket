//To understand recursion, see the bottom of this file

import {observable} from "mobx";
import {computed} from "mobx";
import {action} from "mobx";
import {ClearCart, ModifyCart, GetCart} from '../api/Cart';

export  class Cart {


    @observable
    items = [];

    totalPrice = 0;

    @action
    getElemFromCart = (id => {
        return(this.items.filter(a => {
            if (a.product.id === id) return a;
        })[0]);
    }).bind(this);

    getAll = (() => {
        return this.items.map(elem => {
            return {
                product: elem.product,
                count: elem.count
            }
        });
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
            if (el.id !== id) return el;
        })
    }).bind(this);
    @action
    addToCart = ((elem,count) => {
        if (this.isCartHasElem(elem.id)){
            this.removeFromCart(elem.id);
        } else
        this.items.push({
            product: elem,
            count: count
        });
    }).bind(this);
    @action
    clearCart = (() => {
        this.items.length = 0;
        this.totalPrice = 0;
    }).bind(this);

    loadCart = (() => {
        this.items = new Map();
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
    getCartFromServer = (() => {
        GetCart().then(data => {
            window.localStorage.setItem('cart',JSON.stringify(data));
            this.saveCart();
        })
    });

    @computed get getTotal() {
        return this.items.reduce((acc, el) => {
           return acc + el.product.price * el.count;
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
        })

    };
}

//To understand recursion, see the top of this file