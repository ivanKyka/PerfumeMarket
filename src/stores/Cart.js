//To understand recursion, see the bottom of this file

import {observable} from "mobx";
import {computed} from "mobx";
import {action} from "mobx";
import {ClearCart, ModifyCart, GetCart} from '../api/Cart';

export  class Cart {


    @observable.deep
    items = new Map();

    totalPrice = 0;

    @action
    getElemFromCart = (id => {
        return(this.items.get(id));
    }).bind(this);

    getAll = (() => {
        return Array.from(this.items.values());
    }).bind(this);

    saveCart = (() => {
        window.localStorage.setItem('cart',JSON.stringify(Array.from(this.items.values())));
    }).bind(this);

    @action
    addToCart = ((elem,count) => {
        if (this.items.has(elem.id)){
            this.items.set(elem.id,{elem: elem, count: count + this.items.get(elem.id).count});
        } else
        this.items.set(elem.id,{elem: elem, count: count});
        this.saveCart();
        ModifyCart(this.getAll());
    }).bind(this);

    @action
    removeFromCart = ((id) => {
        this.items.delete(id);
        this.saveCart();
        ModifyCart(this.getAll());
    }).bind(this);

    @action
    clearCart = (() => {
        this.items.clear();
        this.saveCart();
        this.totalPrice = 0;
        ClearCart();
    }).bind(this);

    loadCart = (() => {
        this.items = new Map();
        try{
            JSON.parse(window.localStorage.getItem('cart')).forEach(a => this.items.set(a.elem.id,a));
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
        let data = this.getAll().map(el => {return {elem: {id: el.elem.id, price: el.elem.price}, count: el.count}});
        console.log(data);
        return  data.reduce((acc, cur) => {
            console.log(cur);
            return acc + cur.elem.price * cur.count;
        }, 0);
    }

    @action
    setCount(id, count) {
        let elem = this.items.get(id);
        elem.count = count;
        this.items.set(id, elem);
        this.saveCart();
    };

    @computed
    get sizeOfCart() {
        return this.items.size;
    }
}

//To understand recursion, see the top of this file