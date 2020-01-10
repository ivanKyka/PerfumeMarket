import React from 'react';
import Modal from 'react-responsive-modal';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {inject} from "mobx-react";
import {forgotPassword} from "../../api/Authenticate";
import PreloaderSmall from "../public/PreloaderSmall";
import ReactGA from "react-ga";

@inject('store')
export default class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSuccess: false,
            isLoad: true
        }
        this.email = '';

        this.setEmail =this.setEmail.bind(this);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        setTimeout(() => {
            this.setState({
                isLoad: false
            })
        }, 1000)
    }

    setEmail = e => {
        this.email = e.target.value;
    }

    sendData = e => {
        e.preventDefault();
        this.setState({
            isLoad: true
        })
        forgotPassword(this.email).then(response => {
            this.setState({
                isSuccess: response,
                isLoad: false
            })
        })
    }

    render() {
        if (this.state.isSuccess) return (
            <Modal
                open={this.props.open}
                onClose={this.props.closeLogin}
                styles={{
                    modal:{
                        marginTop: '50px',
                        padding: '0',
                        borderRadius: '12px',
                        height: '168px',
                        width: '450px'
                    },
                    closeIcon: {
                        fill: 'white',
                        cursor: 'pointer'
                    }}
                }
            >
                <Head>Сброс пароля</Head>
                <Instruction>На указанный вами e-mail будет отправлено письмо с подтверждением</Instruction>
                <Instruction>Проверьте, пожалуйста, свою почту и следуйте указанным инструкциям</Instruction>
            </Modal>)
        if (this.state.isLoad) return(
        <Modal
            open={this.props.open}
            onClose={this.props.closeLogin}
            styles={{
                modal:{
                    marginTop: '50px',
                    padding: '0',
                    borderRadius: '12px',
                    height: '168px',
                    width: '450px'
                },
                closeIcon: {
                    fill: 'white',
                    cursor: 'pointer'
                }}
            }
        >
            <PreloaderSmall/>
        </Modal>)
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
                                borderRadius: '12px',
                                width: '450px'
                            },
                            closeIcon: {
                                fill: 'white',
                                cursor: 'pointer'
                            }}
                        }
                    >
                        <LoginForm  onSubmit={this.sendData}>
                            <Head>Сброс пароля</Head>
                            <Field >
                                <FontAwesomeIcon icon={faUser}/>
                                <Input type={"email"}
                                       placeholder={'E-mail'}
                                       required
                                       onChange={this.setEmail}/>
                            </Field>
                            <Button>Сбросить пароль</Button>
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
    width: 450px;
    align-self: center;
    border-radius: 10px;
    background: rgba(239,244,230,0.8);
    filter: none;
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
  width: 380px;
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
  outline: none;
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
  width: 60%;
  align-self: center;
  height: 40px;
  background: ${props => props.theme.primary};
  border: none;
  border-radius: 10px;
  font-size: 16pt;
  cursor: pointer;
  outline: none;
  &:hover {
      background: ${props => props.theme.primary_light};
  }
`;

const Instruction = styled.p`
    display: block;
    padding: 5px 15px;
    margin: 0;
    
`;
