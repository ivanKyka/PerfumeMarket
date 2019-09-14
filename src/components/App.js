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
import Payment from "./public/Payment";
import Contacts from "./Contacts/Contacts";
import Recomendations from "./public/Recomendations";
import License from "./public/License";
import UserAgreement from "./public/UserAgreement";
import Delivery from "./public/Delivery";
import Warranty from "./public/Warranty";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

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
                        </Switch>
                    </BrowserRouter>
                </ApolloProvider>
            </Provider>
        );
    }
}

export default App;