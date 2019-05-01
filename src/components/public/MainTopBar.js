import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default class MainTopBar extends React.Component{

    render() {
        return(
            <Container>
                <div></div>
                <MenuIcon>
                    <FontAwesomeIcon icon={faBars} size={'2x'} onClick={
                        () => {
                            console.log("OK");
                            fetch('http://localhost:1337/graphql',{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzkxZWYxYjMxMDA0YjMxN2Y0ZTkyMzIiLCJpYXQiOjE1NTMwNjgzODIsImV4cCI6MTU1NTY2MDM4Mn0.-KViabW6pHBQmaeMAJDBq6jWsvWNx9lRufIT3bbG8MQ"},
                                body: JSON.stringify({query:'{users{username}}'})
                            }).then((response) => response.json())
                                .then((users) => console.log(users));
                        }
                    }/>
                </MenuIcon>
                <Logo>
                    LOGO
                </Logo>
                <Menu>
                    <li>Lorem</li>
                    <li>Lorem</li>
                    <li>Lorem</li>
                    <li>Lorem</li>
                    <li>Lorem</li>
                    <li>Lorem</li>
                </Menu>
                <Cart>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <span>Cart</span>
                    <Counter>15</Counter>
                </Cart>
                <Link to={'/login'}>
                    <SignInButton>SIGN IN</SignInButton>
                </Link>
            </Container>
        )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 8fr 2fr 2fr ;
  grid-template-rows: 60px;
  background: #222328;
  color: #ececed;
  padding: 0;
  margin: 0;
  align-items: center;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    padding: 20px 10px;
    font-size: 12px;
    height: 20px;
    vertical-align: center;
    cursor: pointer;
  }
  li:hover{
    background:#0d0e11;
  }
`;

const MenuIcon = styled.svg`
  margin: 14px 16px;
  height: 32px;
  width: 28px;
  cursor: pointer;
`;

const Logo = styled.div`
  align-self: center;
  justify-content: right;
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
  margin-top: 1px;
`;

const Cart = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: 20px 35px 15px;
  cursor: pointer;
  span {
    font-size: 12px;
  }
`;

const SignInButton = styled.button`
  font-family: "Gilroy", sans-serif;
  height: 30px;
  border: 2px #ececed solid;
  background: #222328;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  width: 80px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #0d0e11;
  }
`;