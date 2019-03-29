import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import MainPage from "./MainPage/MainPage";
import Cabinet from "./Cabinet/Cabinet";
import Cart from "./Cart/Cart";
import Catalog from "./Catalog/Catalog";
import Checkout from "./Checkout/Checkout";
import Product from "./Product/Product";
import Profile from "./Profile/Profile";


const httpLink = createHttpLink({
    uri: 'https://pure-chamber-16886.herokuapp.com/ZW5kcG9pbnQK',
});

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzkwZDhmMWVlZDAyZDAwMTcyMDAxMzEiLCJpYXQiOjE1NTI5OTg4NTYsImV4cCI6MTU1NTU5MDg1Nn0.dfEKGOHbyq0nqKaqYainR1KI_AH_gzkkvIB9ks97Ld4';
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
                        <Route path={'/cabinet'} component={Cabinet}/>
                        <Route path={'/cart'} component={Cart}/>
                        <Route path={'/catalog'} component={Catalog}/>
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/product/:id'} component={Product}/>
                        <Route path={'/profile'} component={Profile}/>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;