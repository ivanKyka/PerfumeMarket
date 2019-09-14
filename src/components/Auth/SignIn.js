import React from 'react';
import Modal from 'react-responsive-modal';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Login} from "../../api/Authenticate";
import {setCookie} from "../../controllers/Cookies";
import {inject} from "mobx-react";
import User from "../../entities/User";
import ForgotPassword from "./ForgotPassword";

@inject('store')
export default class SignIn extends React.Component {

    loginInfo = {
        login: '',
        password: ''
    };

    loginComplete = (() => {
        this.props.store.cart.mergeCart();
        this.props.closeLogin();
        this.props.updateAuthData();
    }).bind(this);

    submitHandler = (e => {
        e.preventDefault();
        Login(
            this.loginInfo.login,
            this.loginInfo.password
        ).then(data => {
            if (data && true) {
                setCookie('jwt',data.jwt,{expires: 864000});
                this.props.store.userStore.setUser(new User(data.user));
                this.setState({
                    messageVisible: false
                });
                this.loginComplete();
            }
            else this.setState({
                messageVisible: true
            })
        });
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            messageVisible: false,
            isPassVisible: false,
            isForgotPassword: false
        }
    }

    togglePass = () => {
        this.setState((oldState) => {
            return {isPassVisible: !oldState.isPassVisible}
        });
    };

    render() {
        if (this.state.isForgotPassword) return <ForgotPassword open={this.props.open}
                                                                closeLogin={this.props.closeLogin}/>
        return(
            <React.Fragment>

                <ThemeProvider theme={theme}>
                    <Modal
                        open={this.props.open}
                        onClose={this.props.closeLogin}
                        styles={{
                            modal:{
                                marginTop: '50px',
                                padding: '0',
                                borderRadius: '12px'
                                },
                            closeIcon: {
                                fill: 'white',
                                cursor: 'pointer'
                        }}
                        }
                    >
                        <LoginForm  onSubmit={this.submitHandler}>
                            <Head >Вход</Head>
                            <Field >
                                <FontAwesomeIcon icon={faUser}/>
                                <Input type={"text"}
                                       placeholder={'E-mail или Телефон'}

                                       required
                                       onChange={
                                           event => {
                                               event.preventDefault();
                                               this.loginInfo.login = event.target.value;
                                           }
                                       }/>
                            </Field>
                            <Field visible={this.state.isPassVisible}

                            >
                                <FontAwesomeIcon icon={faKey}/>
                                <Input type={this.state.isPassVisible ? 'text' : 'password'}
                                       placeholder={'Пароль'}

                                       onChange={
                                           event => {
                                               event.preventDefault();
                                               this.loginInfo.password = event.target.value;
                                           }
                                       }/>
                                <FontAwesomeIcon icon={this.state.isPassVisible ? faEyeSlash : faEye}
                                                 onClick={this.togglePass}/>
                            </Field>
                            <Err visible={this.state.messageVisible}>Логин или пароль введен неправильно</Err>
                            <Button  >Войти</Button>
                            <LinkButton onClick={() => this.setState({isForgotPassword: true})}>
                                Забыли пароль?
                            </LinkButton>
                            <RegLink>
                                <Link to={'/signUp'}>Регистрация</Link>
                            </RegLink>
                        </LoginForm>
                    </Modal>
                </ThemeProvider>
            </React.Fragment>
        )
    }
}

const LoginForm = styled.form`
    padding: 0 0 15px 0;
    display: grid;
    justify-items: center;
    grid-gap: 15px;
    width: 300px;
    align-self: center;
    border-radius: 10px;
    background: rgba(239,244,230,0.8);
    filter: none;
`;


const Head = styled.span`
  text-align: center;
  align-self: start;
  justify-self: normal;
  font-size: 22pt;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0;
  padding: 10px;
  background: ${props => props.theme.bgDarkCol};
  color: white;
`;

const Input = styled.input`
  width: 240px;
  background: rgba(239,244,230,0.8);
  justify-self: center;
  height: 40px;
  padding-left: 40px;
  border: none;
  border-bottom: 2px solid black;
  transition: .5s ease-out;
  z-index: 1;
  font-size: 12pt;
  color: black;
`;

const Field = styled.div`

  svg{
  position: absolute;
  z-index: 2;
  color: black;
  }

  svg:last-of-type{
  margin-left:${props => props.visible ? '-25px' : '-24px'};
  margin-top: 15px;
  cursor: pointer;
  }
  svg:first-of-type{
  margin-left: 15px;
  margin-top: 15px;
  }
`;

const Button = styled.button`
  color: white;
  width: 80%;
  align-self: center;
  height: 40px;
  background: ${props => props.theme.primary};
  border: none;
  border-radius: 10px;
  font-size: 16pt;
  cursor: pointer;
  &:hover {
      background: ${props => props.theme.primary_light};
  }
`;

const Err = styled.span`
  width: 280px;
  color: red;
  display: ${props => props.visible?'block':'none'};
  justify-self: center;
`;

const RegLink = styled.div`
    a {
      font-size: 16pt;
      color: ${props => props.theme.primary};  
    }
    
    a:hover {
      color: ${props => props.theme.primary_light};
    }
    
`;

const LinkButton = styled.span`
    font-size: 16pt;
    color: ${props => props.theme.primary}; 
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.primary_light};
      text-decoration: underline;
    }
`;