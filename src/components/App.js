import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import MainPage from "./MainPage";


const httpLink = createHttpLink({
    uri: 'http://localhost:1337/graphql',
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
                        </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;