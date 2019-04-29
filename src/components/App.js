import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import MainPage from "./MainPage/MainPage";
import Contact from "./Cabinet/Contact";
import Address from "./Cabinet/Address";
import Cart from "./Cart/Cart";
import Catalog from "./Catalog/Catalog";
import Checkout from "./Checkout/Checkout";
import Product from "./Product/Product";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import AboutUs from "./About/AboutUs";
import Iwantit from "./Cabinet/Iwantit";
import Purchase from "./Cabinet/Purchase";



const httpLink = createHttpLink({
    uri: 'http://localhost:1337/ZW5kcG9pbnQK',
});

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzkxZWYxYjMxMDA0YjMxN2Y0ZTkyMzIiLCJpYXQiOjE1NTMwNjgzODIsImV4cCI6MTU1NTY2MDM4Mn0.-KViabW6pHBQmaeMAJDBq6jWsvWNx9lRufIT3bbG8MQ';
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
       console.log(this.a);
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'} component={MainPage}/>
                        <Route path={'/cabinet'} component={Contact}/>
                        <Route path={'/cart'} component={Cart}/>
                        <Route path={'/catalog'} component={Catalog}/>
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/product/:id'} component={Product}/>
                        <Route path={'/profile'} component={Profile}/>
                        <Route path={'/signIn'} component={Profile}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/aboutUs'} component={AboutUs}/>
                        <Route path={'/contact'} component={Contact}/>
                        <Route path={'/address'} component={Address}/>
                        <Route path={'/iWantIt'} component={Iwantit}/>
                        <Route path={'/purchase'} component={Purchase}/>



                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;