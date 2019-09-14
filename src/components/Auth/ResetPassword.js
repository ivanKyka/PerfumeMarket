import React from 'react';
import styled from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faKey} from "@fortawesome/free-solid-svg-icons";
import Preloader from "../public/Preloader";
import {resetPassword} from "../../api/Authenticate";
import {Link} from "react-router-dom";
import Header from "../public/Header";
import Footer from "../public/Footer";
import MetaTags from 'react-meta-tags';


export default class ResetPassword extends React.Component {

    constructor(props){
        super(props);
        this.url = new URL(location.href);
        this.code = this.url.searchParams.get('code');
        this.password = '';
        this.repeat_password = '';
        this.state = {
            messageVisible: false,
            isPassVisible: false,
            isLoad: false,
            success: false
        }

        this.sendData = this.sendData.bind(this);
        this.togglePass = this.togglePass.bind(this);
        this.setProperty = this.setProperty.bind(this);
    }

    togglePass = () => {
        this.setState((oldState) => {
            return {isPassVisible: !oldState.isPassVisible}
        });
    };

    setProperty = e => {
        this[e.target.name] = e.target.value;
    }

    sendData = e => {
        e.preventDefault();
        if (this.password !== this.repeat_password) this.setState({messageVisible: true});
        else {
            let data = {
                code: this.code,
                password: this.password,
                passwordConfirmation: this.repeat_password
            }
            this.setState({isLoad: true});
            resetPassword(data).then(response => {
                this.setState({
                    isLoad: false,
                    success: response
                })
            })

        }
    }

    render() {
        if (this.state.isLoad) return <React.Fragment>
            <Header/>
            <Container>
                <Preloader/>
            </Container>
            <Footer/>
        </React.Fragment>
        if (this.state.success) return (
            <React.Fragment>
                <Header/>
                <Success>
                    <p>Ваш пароль успешно изменен</p>
                    <span>Теперь вы можете ввойти в личный кабинет через <Link to={'/'}>главную страницу</Link></span>
                </Success>
                <Footer/>
            </React.Fragment>
        )
        return(
            <React.Fragment>
                <MetaTags>
                    <title>Сброс пароля</title>
                </MetaTags>
                <Header/>
                <Container>
                    <LoginForm  onSubmit={this.sendData}>
                        <Head>Изменить пароль</Head>
                        <Info>Введите новый пароль</Info>
                        <Info>(не менее 8 символов)</Info>
                        <Field visible={this.state.isPassVisible}

                        >
                            <FontAwesomeIcon icon={faKey}/>
                            <Input type={this.state.isPassVisible ? 'text' : 'password'}
                                   placeholder={'Пароль'}
                                   name={'password'}
                                   pattern={'.{8,}'}
                                   onChange={this.setProperty}/>
                            <FontAwesomeIcon icon={this.state.isPassVisible ? faEyeSlash : faEye}
                                             onClick={this.togglePass}/>
                        </Field>
                        <Field >
                            <FontAwesomeIcon icon={faKey}/>
                            <Input
                                type={"password"}
                                placeholder={'Повторить пароль'}
                                name={'repeat_password'}
                                required
                                onChange={this.setProperty}
                            />
                        </Field>
                        <Err visible={this.state.messageVisible}>Пароли не совпадают</Err>
                        <Button>Подтвердить</Button>
                    </LoginForm>
                </Container>
                <Footer/>
            </React.Fragment>
        )
        }
    }

const Container = styled.div`
    width: 100%;
    display: grid;
    justify-content: center;
    min-height: calc(100vh - 360px);
`;


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
    margin: 50px auto;
`;


const Head = styled.span`
  text-align: center;
  align-self: start;
  justify-self: normal;
  font-size: 18pt;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0;
  padding: 10px;
  background: ${theme.bgDarkCol};
  width: 100%;
  display: block;
 
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
  background: ${theme.primary};
  border: none;
  border-radius: 10px;
  font-size: 16pt;
  cursor: pointer;
  &:hover {
      background: ${theme.primary_light};
  }
`;

const Err = styled.span`
  width: 280px;
  color: red;
  display: ${props => props.visible?'block':'none'};
  justify-self: center;
  padding-left: 15px;
`;

const Info = styled.p`
    display: block;
    margin: 0;
    padding: 0 30px;
    
`;

const Success = styled.div`
    display: grid;
    margin-top: 50px;
    justify-items: center;
    min-height: calc(100vh - 360px);
    p {
        font-size: 26pt;
    }
    span{
        font-size: 18pt;
    }
`;