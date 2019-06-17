import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import styled, {ThemeProvider} from 'styled-components';
import {Link} from 'react-router-dom';
import LogoImg from '../../resources/image/Logo.svg'
import SignInButton from '../Auth/SignInButton';
import {theme} from "../../stores/StyleStore";
import SignIn from "../Auth/SignIn";
import {deleteCookie} from "../../controllers/Cookies";
import {me} from "../../api/Users";
import User from "../../entities/User";
import {inject} from "mobx-react";

@inject('store')
export default class Header extends React.Component{

    updateAuthData = (() => {
        me().then(data => {
            if(!data){
                this.setState({
                    ready: true
                })
            } else {
                this.props.store.userStore.setUser(new User(data));
                this.setState({
                    data: data,
                    authorized: true,
                    ready: true
                })
            }
        })
    }).bind(this);
    closeLogin = (() => {
        this.setState({
            loginOpen: false
        })
    }).bind(this);
    openLogin = (e => {
        e.preventDefault();
        this.setState({
            loginOpen: true
        })
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            loginOpen: false,
            authorized: false,
            ready: false,
            data: {}
        }
    }

    componentWillMount() {
        this.updateAuthData();
    }

    render() {
        return(
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <Container>
                        <Logo>
                            <Link to={'/'}>
                                <img src={LogoImg}/>
                            </Link>
                        </Logo>
                        <Menu>
                            <li onClick={e => {
                                e.preventDefault();
                                deleteCookie('jwt')
                            }}>Logout</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                        </Menu>
                        <Cart>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span>Cart</span>
                            <Counter>0</Counter>
                        </Cart>
                        <SignInButton
                            openLogin={this.openLogin}
                            authorized={this.state.authorized}
                            data={this.state.data}
                        />
                    </Container>
                </ThemeProvider>
                <SignIn
                    open={this.state.loginOpen}
                    closeLogin={this.closeLogin}
                    updateAuthData={this.updateAuthData}
                />
            </React.Fragment>
        )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns:  1fr 4fr 1fr 150px ;
  padding: 0 50px;
  grid-template-rows: 60px;
  background: #222328;
  color: #ececed;
  margin: 0;
  align-items: center;
  width: 100%;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0 10px;
  margin: 0;
  justify-self: center;
  height: 100%;
  li {
    display: inline-block;
    padding: 20px 10px;
    font-size: 1vw;
    height: 100%;
    vertical-align: center;
    cursor: pointer;
    margin: 0;
  }
  li:hover{
    background:#0d0e11;
  }
`;


const Logo = styled.div`
  display: block;
  height: 50px;
  align-self: center;
  a{
    display: block;
    height: 50px;
    text-decoration: none;
    color: white;
  }
  img{
      height: 50px;
      align-self: center;
      display: block;
      justify-content: right;
      cursor: pointer;
  }
`;

const Counter = styled.div`
  justify-self: left;
  padding: 2px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background: #ececed;
  color: #222328;
  width: 15px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  height: 15px;
  margin-top: -2px;
`;

const Cart = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: 20px 35px 15px;
  cursor: pointer;
  justify-self: right;
  span {
    font-size: 12px;
  }
`;
