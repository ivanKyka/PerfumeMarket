import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Header from "../public/Header";
import Footer from "../public/Footer";
import Contacts from "./Contacts";
import {theme} from "../../stores/StyleStore";
import Address from "./Address";
import WishList from "./WishList";
import Purchase from "./OrdersHistory/OrdersHistory";
import {me} from "../../api/Users";
import {Redirect} from "react-router";
import {inject} from "mobx-react";
import {Logout} from "../../api/Authenticate";
import {Link} from "react-router-dom";
import Preloader from "../public/Preloader";
import ReactGA from "react-ga";

@inject('store')
export default class Cabinet extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            currentPage: props.match.params.page,
            authorized: true,
            ready: false
        }
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
        me().then(data => {
            if(!data){
                this.setState({
                    authorized: false,
                })
            } else {
                this.setState({
                    authorized: true,
                    ready: true
                })
            }
        });
    }


    setPage = ((e,page) => {
        e.preventDefault();
        this.setState({
            currentPage: page
        })
    }).bind(this);

    returnPage = page => {
        switch (page) {
            case 'contacts': return <Contacts/>;
            case 'address': return <Address/>;
            case 'wishList': return <WishList/>;
            case 'purchase': return <Purchase/>;
        }
    };

render() {
    if (!this.state.authorized){
        return <Redirect to={'/'}/>
    }
    if (!this.state.ready) return <Preloader/>
    return(
        <ThemeProvider  theme={theme}>
        <React.Fragment>
            <Header/>
            <Container>
            <Head>
                <Li active={this.state.currentPage === 'contacts'}
                    onClick={e => {this.setPage(e,'contacts')}}
                >
                    <Link to={'/cabinet/contacts'}>Контактная информация</Link>
                </Li>
                <Li active={this.state.currentPage === 'address'}
                    onClick={e => {this.setPage(e,'address')}}
                >
                    <Link to={'/cabinet/address'}>Адрес доставки</Link>
                </Li>
                <Li active={this.state.currentPage === 'wishList'}
                    onClick={e => {this.setPage(e,'wishList')}}
                >
                    <Link to={'/cabinet/favorite'}>Избранное</Link>
                </Li>
                <Li active={this.state.currentPage === 'purchase'}
                    onClick={e => {this.setPage(e,'purchase')}}
                >
                    <Link to={'/cabinet/purchase'}>История покупок</Link>
                </Li>

                <Li
                    onClick={e => {
                        e.preventDefault();
                        this.props.store.cart.clearCart();
                        Logout();
                    }}
                >Выход</Li>
            </Head>
            <Page>
                {this.returnPage(this.state.currentPage)}
            </Page>
            </Container>
            <Footer/>
        </React.Fragment>
    </ThemeProvider>

)
    }
}

const Container = styled.div`
    display: block;
    min-height: calc(100vh - 300px) !important;
    @media(min-width: 1100px){
        padding: 20px 50px;
    }
    @media(max-width: 1100px){
        padding: 20px 10px;
    }
`;

const Head = styled.ul`
    list-style: none;
    display: block;
    padding: 0;   
`;

const Page = styled.div`
    display: block;
    min-height: calc(100vh - 360px);
`;

const Li = styled.li`
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        font-size: 1em;
        color: ${props => props.active ? props.theme.primary : '#000'};
        text-decoration: ${props => props.active ? 'underline':'none'};
    &:last-child {
        float: right;
    }
    &:hover {
        text-decoration: underline;
        color: ${props => props.theme.primary};
    }
    
    a {
        color: inherit;
    }
    a:hover {
        text-decoration: underline;
        color: ${props => props.theme.primary};
    }
`;