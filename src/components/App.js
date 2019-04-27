import React, {Component} from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
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
import UrlStore from "../stores/UrlStore";
import {Provider} from 'mobx-react';

const urlStore = new UrlStore();

const httpLink = createHttpLink({
    uri: urlStore.MAIN_GRAPHQL_URI
});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: urlStore.TOKEN ? `Bearer ${urlStore.TOKEN}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const store = {urlStore: urlStore};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
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
            </Provider>
        );
    }
}

export default App;