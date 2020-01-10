import React, {Component} from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import MainPage from "./MainPage/MainPage";
import Cart from "./Cart/Cart";
import Catalog from "./Catalog/Catalog";
import Checkout from "./Checkout/Checkout";
import Product from "./Product/Product";
import {UrlStore} from "../stores/UrlStore";
import {Provider} from 'mobx-react';
import Register from './Auth/Register';
import AboutUs from './About/AboutUs';
import Cabinet from "./Cabinet/Cabinet";
import {UserStore} from '../stores/userStore';
import {Cart as CartStore} from '../stores/Cart';
import BlogCatalog from './Blog/BlogCatalog';
import BlogPage from "./Blog/BlogPage";
import {me} from "../api/Users";
import Payment from "./InfoPages/Payment";
import Contacts from "./Contacts/Contacts";
import License from "./InfoPages/License";
import UserAgreement from "./InfoPages/UserAgreement";
import Delivery from './InfoPages/Delivery'
import Warranty from "./InfoPages/Warranty";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import '../index.css';
import AlertTest from "./public/AlertTest";
import 'react-notifications-component/dist/theme.css'
import Order from "./Order/Order";
import ReactGA from 'react-ga';
import {isMobile} from 'react-device-detect';

const httpLink = createHttpLink({
    uri: UrlStore.MAIN_GRAPHQL_URI
});


export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const cart = new CartStore();
export const userStore =  new UserStore();

const store = {
    userStore: userStore,
    urlStore: UrlStore,
    cart: cart
};


class App extends Component {


    componentWillMount() {
        if (isMobile) location.href = 'https://m.profumo.com.ua' + location.pathname + location.search;
        ReactGA.initialize('UA-128259482-2');

        me().then(data => {
            if (data) userStore.setUser(data);

        })
        cart.loadCart();
    }

    render() {
        return (
            <Provider store={store}>
                <ApolloProvider client={client}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path={'/'} component={MainPage}/>
                                <Route path={'/cart'} component={Cart}/>
                                <Route path={'/catalog/:id'} component={Catalog}/>
                                <Route path={'/checkout'} component={Checkout}/>
                                <Route path={'/product/:id'} component={Product}/>
                                <Route path={'/signUp'} component={Register}/>
                                <Route path={'/aboutUs'} component={AboutUs}/>
                                <Route path={'/cabinet/:page'} component={Cabinet}/>
                                <Route exact path={'/blog'} component={BlogCatalog}/>
                                <Route path={'/blog/:id'} component={BlogPage}/>
                                <Route path={'/checkout'} component={Checkout}/>
                                <Route path={'/contacts'} component={Contacts}/>
                                <Route exact path={'/payment'} component={Payment}/>
                                <Route exact path={'/license'} component={License}/>
                                <Route exact path={'/user_agreement'} component={UserAgreement}/>
                                <Route exact path={'/delivery'} component={Delivery}/>
                                <Route exact path={'/warranty'} component={Warranty}/>
                                <Route exact path={'/forgotPassword'} component={ForgotPassword}/>
                                <Route exact path={'/resetPassword'} component={ResetPassword}/>
                                <Route exact path={'/order'} component={Order}/>
                            </Switch>
                        </BrowserRouter>
                </ApolloProvider>
            </Provider>
        );
    }
}

export default App;