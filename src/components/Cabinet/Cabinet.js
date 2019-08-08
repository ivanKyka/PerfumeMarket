import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Header from "../public/Header";
import Footer from "../public/Footer";
import Contacts from "./Contacts";
import {theme} from "../../stores/StyleStore";
import Address from "./Address";
import WishList from "./WishList";
import Purchase from "./Purchase";
import {me} from "../../api/Users";
import {Redirect} from "react-router";
import {inject} from "mobx-react";
import {Logout} from "../../api/Authenticate";

@inject('store')
export default class Cabinet extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            currentPage: 'Contacts',
            authorized: true
        }
    }

    componentDidMount() {
        me().then(data => {
            if(!data){
                this.setState({
                    authorized: false
                })
            } else {
                this.setState({
                    authorized: true
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
            case 'Address': return <Address/>;
            case 'Contacts': return <Contacts/>;
            case 'WishList': return <WishList/>;
            case 'Purchase': return <Purchase/>;
        }
    };

render() {
    if (!this.state.authorized){
        return <Redirect to={'/'}/>
    }
    return(
        <ThemeProvider  theme={theme}>
        <React.Fragment>
            <Header/>
            <Container>
            <Head>
                <Li
                    onClick={e => {this.setPage(e,'Contacts')}}
                    active={!!(this.state.currentPage === 'Contacts')}
                >Контактная информация</Li>
                <Li
                    onClick={e => {this.setPage(e,'Address')}}
                    active={!!(this.state.currentPage === 'Address')}
                    >Адрес доставки</Li>
                <Li
                    onClick={e => {this.setPage(e,'WishList')}}
                    active={!!(this.state.currentPage === 'WishList')}
                >Пожелания</Li>
                <Li
                    onClick={e => {this.setPage(e,'Purchase')}}
                    active={!!(this.state.currentPage === 'Purchase')}
                >История покупок</Li>
                <Li
                    onClick={e => {
                        e.preventDefault();
                        Logout();
                        this.props.store.cart.clearCart();
                        this.setState({
                            authorized: false
                        })
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
    padding: 20px 50px;
`;

const Head = styled.ul`
    list-style: none;
    display: block;
    padding: 0 40px;   
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
`;