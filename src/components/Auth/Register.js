import React from "react"
import styled, {ThemeProvider} from 'styled-components';
import Footer from "../public/Footer"
import Header from "../public/Header";
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import {Register as Reg} from "../../api/Authenticate";

export default class Register  extends React.Component{

    sendRegInfo = (e => {
        e.preventDefault();
        if (this.state.passIsCorrect) {
            Reg(
                this.phoneRef.current.value,
                this.emailRef.current.value,
                this.passwordRef.current.value,
                this.nameRef.current.value,
                this.surnameRef.current.value
            ).then(a => {
                console.log(a);
            })
        }
    });

    constructor(props){
        super(props);
        this.state = {
            passIsCorrect: true
        };
        this.nameRef = React.createRef();
        this.surnameRef = React.createRef();
        this.emailRef = React.createRef();
        this.phoneRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
    }

    passEnterHandler = e => {
        e.preventDefault();
        if(e.target.value === document.getElementById('confirm_password').value
            || document.getElementById('confirm_password').value === '')
            this.setState({
                passIsCorrect: true
            });
        else this.setState({
            passIsCorrect: false
        })
    };

    confirmPassEnterHandler = e => {
        e.preventDefault();
        if (e.target.value === '' ||
            e.target.value === document.getElementById('password').value)
            this.setState({
                passIsCorrect: true
            });
        else this.setState({
            passIsCorrect: false
        })
    };

render() {
        return (
            <ThemeProvider theme={theme}>
            <React.Fragment>
                <Header/>
                <MainFromLogin>
                    <Box>
                        <Form onSubmit={this.sendRegInfo}>
                            <TitleForm>
                                <h3>РЕГИСТРАЦИЯ</h3>
                            </TitleForm>
                            <Information>
                                <Add>
                                        <div>
                                            <p>Имя</p>
                                            <InputBlock>
                                                <FontAwesomeIcon icon={faUser}/>
                                                <Input
                                                    pattern="[А-Яа-яЁё`ЇїЄєІі]{2,}"
                                                    type="text"
                                                    placeholder="Введите ваше имя"
                                                    required
                                                    ref={this.nameRef}
                                                />
                                            </InputBlock>
                                        </div>
                                    <div>
                                        <p>Фамилия</p>
                                        <InputBlock>
                                            <FontAwesomeIcon icon={faUser}/>
                                            <Input
                                                pattern="[А-Яа-яЁё`ЇїЄєІі]{2,}"
                                                type="text"
                                                placeholder="Введите вашу фамилию"
                                                required
                                                ref={this.surnameRef}
                                            />
                                        </InputBlock>
                                    </div>

                                    <div>
                                        <p>Эл. почта</p>
                                        <InputBlock>
                                            <FontAwesomeIcon icon={faAt}/>
                                            <Input
                                                type="email"
                                                placeholder="Введите вашу эл. почту"
                                                required
                                                ref={this.emailRef}
                                            />
                                        </InputBlock>
                                    </div>
                                    <div>
                                        <p>Номер телефона</p>
                                        <InputBlock>
                                            <FontAwesomeIcon icon={faPhone}/>
                                            <Input
                                                pattern="[+]{0,1}[0-9]{10,12}"
                                                type="tel" placeholder="Введите ваш моб.номер"
                                                required
                                                ref={this.phoneRef}
                                            />
                                        </InputBlock>
                                    </div>

                                    <div>
                                        <p>Пароль</p>
                                        <InputBlock>
                                            <FontAwesomeIcon icon={faKey}/>
                                            <Input pattern="((?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZA-ЯЁ]).{6,})"
                                                   type="password"
                                                   placeholder="Введите пароль"
                                                   id="password" required
                                                   onChange={this.passEnterHandler}
                                                   ref={this.passwordRef}
                                            />
                                        </InputBlock>
                                    </div>

                                    <div>
                                        <p>Повторите пароль</p>
                                        <InputBlock>
                                            <FontAwesomeIcon icon={faKey}/>
                                            <Password pattern="((?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZA-ЯЁ]).{6,})"
                                                      type="password"
                                                      placeholder="Повторно введите пароль"
                                                      id="confirm_password" required
                                                      Correct={this.state.passIsCorrect}
                                                      onChange={this.confirmPassEnterHandler}
                                                      ref={this.confirmPasswordRef}
                                                      />
                                        </InputBlock>
                                    </div>

                                </Add>
                                <Remain>
                                    <Agree>
                                        <input
                                            type="checkbox"
                                            id="agree"
                                            required
                                        />
                                        <label htmlFor="agree"> Я соглашаюсь </label>
                                    </Agree>
                                    <BoxBut>
                                        <But
                                            type="submit"
                                            disabled={this.state.checked}
                                        > REGISTER NOW</But>
                                    </BoxBut>
                                    <SomeText>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur
                                            doloremque explicabo labore minima rerum!</p>
                                    </SomeText>
                                </Remain>

                            </Information>
                        </Form>
                        <Link>
                            <LinkTxt>
                                <h3>Or Sing In As User</h3>
                            </LinkTxt>
                            <IconLink>
                                    <a href="">
                                        <MenuIcon>
                                            <FontAwesomeIcon icon={faGoogle} size={'2x'}/>
                                        </MenuIcon>
                                    </a>
                                    <a href="">
                                        <MenuIcon>
                                            <FontAwesomeIcon icon={faFacebookF} size={'2x'}/>
                                        </MenuIcon>
                                    </a>
                                    <a href="">
                                        <MenuIcon>
                                            <FontAwesomeIcon icon={faTwitter} size={'2x'}/>
                                        </MenuIcon>
                                    </a>
                            </IconLink>
                        </Link>
                    </Box>
                </MainFromLogin>
                <Footer/>

            </React.Fragment>
            </ThemeProvider>
        )
    }
}
const MainFromLogin = styled.div`
    display: grid;
    background-color: white;
    grid-template-rows: 1fr;
 
`;
const Box = styled.div`
    display: grid;
    height: 600px;
    width: 500px;
    grid-template-rows: 500px 100px;
    justify-self: center;
    margin: 100px;
    ::-webkit-input-placeholder {font-size: 10px;}
    ::-moz-placeholder          {font-size: 10px;}
    :-moz-placeholder           {font-size: 10px;}
    :-ms-input-placeholder      {font-size: 10px;}
`;
const Form = styled.form`
    display: grid;
    grid-template-rows: 50px 450px;
    border: 1px solid gray;
    border-radius: 15px;
    -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
    -o-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
`;
const TitleForm = styled.div`
    display: grid;
    background-color: ${props => props.theme.bgCol};
    color: white;
    width: 540px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    h3{
        justify-self: center;
        align-self: center;
    }
`;
const Information = styled.div`
    display: grid;
    grid-template-rows: 250px 200px;
    div {
      p{
        margin-left: 10px;
      }
    }
`;
const Add = styled.div`
    width: 450px;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    justify-self: center;
`;

const InputBlock = styled.div`
    svg{
      position: absolute;
      padding-left: 20px;
      margin-top: 6px;
      color: #ccc;
  }
`;

const Remain = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;
const Agree = styled.div`
    margin-left: 35px;
    align-self: center;
    input[type=checkbox]{
        display: none;
    }
    label{
        padding-left: 20px;

    }
    label:before{
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        background-color: white;
        vertical-align: middle;
        border: 1px solid black;
    }
    input[type="checkbox"]:checked + label::before{
        background-color: ${props => props.theme.bgCol};
    }
`;
const BoxBut = styled.div`
    display: block;
    align-self: center;
    text-align: center;
`
const But = styled.button`
    width: 80%;
    padding: 10px;
    border: none;
    border-radius: 15px;
    outline: none;
    background-color: ${props => props.theme.primary};
    cursor: pointer;
    color: white;
    
    &:hover{
      background-color: ${props => props.theme.primary_light};
    }
`
const SomeText = styled.div`
    align-self: center;
    justify-self: center;
    width: 80%;
    p{
        font-size: 12px;    
    }
`
const Link = styled.div`
    display: grid;
    grid-template-rows: 40px 60px;
`
const LinkTxt = styled.div`
    align-self: center;
    justify-self: center;
    h3 {
        font-size: 16px;
    }
`
const IconLink = styled.div`
    display: grid;
    grid-template-columns: repeat(3,60px);
    justify-items: center;
    width: 180px;
    justify-self: center;
    a {
      display: block;
      align-self: center;
      justify-self: center;
    }
`

const MenuIcon = styled.svg`
    cursor: pointer;  
    color: #000;
    width: 40px;
    height: 40px;  
    &:hover{
      color: ${props => props.theme.primary};
    }
`


const Password = styled.input`
    border: 1px solid ${props => props.Correct?'#CCC':'red'};
    outline: none;
    width: 90%;
    padding: 6px 5px 6px 30px;
    display: inline-block;
    border-radius: 4px;
    box-sizing: border-box; 
    background: #fff;
    color: #000;
    margin-left: 5%;
`;

const Input = styled.input`
    margin-left: 5%;
    outline: none;
    width: 90%;
    padding: 6px 5px 6px 30px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; 
    background: #fff;
    color: #000;
`;