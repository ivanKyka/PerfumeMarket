import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import styled, {ThemeProvider} from 'styled-components';
import {Link} from 'react-router-dom';
import LogoImg from '../../resources/image/Logo.svg'
import SignInButton from '../Auth/SignInButton';
import {theme} from "../../stores/StyleStore";
import SignIn from "../Auth/SignIn";
import {me} from "../../api/Users";
import User from "../../entities/User";
import {inject, observer} from "mobx-react";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {debounce} from "lodash";

@inject('store')
@observer
export default class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loginOpen: false,
            authorized: false,
            ready: false,
            data: {},
            menuOpened: false
        }
    }




    toggleMenu = (() => {
        this.setState(oldState => {
            return {
                menuOpened: !oldState.menuOpened
            }
        })
    }).bind(this);

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

    componentWillMount() {
        this.updateAuthData();
        this.props.store.cart.getCartFromServer();
    }

    render() {
        return(
            <React.Fragment>
                <ThemeProvider theme={{
                    colors: theme,
                    opened: this.state.menuOpened
                }}>
                    <Container>
                        <Logo>
                            <Link to={'/'}>
                                <img src={LogoImg}/>
                            </Link>
                        </Logo>
                        <MenuIcon icon={faBars} onClick={this.toggleMenu} size={'2x'}/>
                        <Menu>
                            <Link to={'/'}><li>ГЛАВНАЯ</li></Link>
                            <Link to={'/contacts'}>
                                <li>КОНТАКТЫ</li>
                            </Link>
                            <Link to={'/blog'}>
                                <li>БЛОГ</li>
                            </Link>
                            <Link to={'/aboutUs'}><li>О НАС</li></Link>
                            <Link to={'/delivery'}><li>ДОСТАВКА</li></Link>
                        </Menu>
                        <Cart to={'/cart'}>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span>Корзина</span>
                            <Counter>{this.props.store.cart.sizeOfCart}</Counter>
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
  @media(min-width: 1000px) {
      grid-template-columns:  1fr 4fr 1fr 150px ;
      padding: 0 50px;
      grid-template-rows: 60px;
      align-items: center;
  }
  @media(max-width: 999px) {
      height: ${props => props.theme.opened?'480px':'60px'};
      grid-template-rows: ${props => props.theme.opened?'60px 300px 60px 60px':'60px'};
      padding: 0;
      overflow: hidden;
  }
  transition: height .5s;
  background: ${props => props.theme.colors.bgCol};
  color: #fff;
  margin: 0;
  width: 100%;
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  height: 100%;
  
  @media(min-width: 1000px) {
      padding: 0 10px;
      margin: 0 auto;
      justify-self: center;
      li {
          display: inline-block;
          font-size: 1vw;
      }
  }
  @media(max-width: 999px) {
      padding: 0;
      li {
          display: block;
          width: 100%;
          font-size: 12pt;
          padding: 0 10px;
      }
  }
  
  li {
    display: inline-block;
    padding: 20px 10px;
    height: 60px;
    vertical-align: center;
    cursor: pointer;
    margin: 0;
    color: white;
  }
  li:hover{
    background: ${props => props.theme.colors.bgDarkCol};
    text-decoration: underline;
  }
`;


const Logo = styled.div`
  @media(min-width: 1000px) {
      width: 100%;
  }
  @media(max-width: 999px) {
      width: 225px;
      margin-left: 20px;
  }

  display: block;
  height: 60px;
  padding: 5px;
  align-self: center;
  justify-items: center;
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
      cursor: pointer;
      object-fit: contain;
  }
  &:hover{
    background: ${props => props.theme.colors.bgDarkCol};
  }
 

`;

const Counter = styled.div`
  justify-self: left;
  padding: 3px 2px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background: #fff;
  color: ${props => props.theme.colors.bgCol};
  width: 18px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  height: 18px;
  margin-top: -2px;
  text-decoration: none;
`;

const Cart = styled(Link)`
  
  @media(min-width: 1000px) {
      justify-self: right;
      span {
          font-size: 14px;
      }
  }
  @media(max-width: 999px) {
      justify-self: left;
      padding: 0 10px;
      width: 100%;
      span {
          font-size: 12pt;
      }
  }
  display: grid;
  align-content: center;
  grid-template-columns: 20px 1fr 15px;
  cursor: pointer;
  padding: 10px;
  height: 60px;
  color: white;
  span {
    padding: 0 10px;
    font-size: 14pt;
  }
  
  a:visited {
    color: white;
  }
  
  &:hover {
    color: white;
    background: ${props => props.theme.colors.bgDarkCol};
   }
   
  &:hover span {
      text-decoration: underline;
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
      @media(min-width: 1000px) {
          display: none;
      }
      @media(max-width: 999px) {
          display: block;
      }
    position: absolute;
    top: 14px;
    right: 16px;
    cursor: pointer;
`;
