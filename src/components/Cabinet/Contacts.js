import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css';
import {Russian} from "flatpickr/dist/l10n/ru";
import {inject, observer} from "mobx-react";
import {changeUserData, me} from "../../api/Users";
import Preloader from "../public/Preloader";
import MetaTags from "react-meta-tags";
import ReactNotification, {store} from "react-notifications-component";
import Notification from "../public/Notification";
import ReactGA from "react-ga";

@inject('store')
@observer
export default class Contacts extends React.Component{

    saveUserInfo = (e => {
        e.preventDefault();
        this.setState({ready: false});
        changeUserData(this.state.userInfo)
            .then(respose => {
                if (respose){
                    this.setState({ready: true});
                    if (respose) store.addNotification(Notification('Сохранено'));
                }
            })
    }).bind(this);

    constructor(props){
        super(props);
        this.phoneRegEx = /[+]?[0-9]{10,12}/;

        this.state = {
            userInfo: {},
            birthday: '',
            ready: false
        };

        this.maleButton = React.createRef();
        this.femaleButton = React.createRef();
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        me().then(data => {
            this.setState({
                userInfo: data,
                birthday: data.birthday?data.birthday.slice(0,10):'',
                ready: false
            })
        })
    }


    componentDidUpdate() {
        console.log(this.state.userInfo.gender);
        if (this.state.userInfo.gender === 'male') {
            this.maleButton.current.checked = true;
        }
        if (this.state.userInfo.gender === 'female') {
            this.femaleButton.current.checked = true;
        }
    }

    render() {
        if (!this.state.ready) <Preloader/>

        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                <MetaTags>
                    <title>Контактная информация</title>
                </MetaTags>
                <Form>
                    <div>
                        <Label>
                            <span>Имя</span>
                            <Input
                                type={'text'}
                                onChange={e => {this.state.userInfo.name = e.target.value}}
                                defaultValue={this.state.userInfo.name}
                            />
                        </Label>
                        <Label>
                            <span>Фамилия</span>
                            <Input
                                type={'text'}
                                onChange={e => {this.state.userInfo.surname = e.target.value}}
                                defaultValue={this.state.userInfo.surname}
                            />
                        </Label>
                        <Label>
                            <span>E-mail</span>
                            <Input
                                type={'text'}
                                defaultValue={this.state.userInfo.email}
                                readOnly={true}
                            />
                        </Label>
                    </div>
                    <div>
                        <Label>
                            <span>Дата рождения</span>
                            <Flatpickr
                                options={{
                                    locale: Russian,
                                    dateFormat: 'd.m.Y',
                                }}
                                value={this.state.birthday}
                                onChange={date => {this.state.userInfo.birthday =  date[0].toISOString()}}
                            />
                        </Label>
                        <Label>
                            <span>Телефон</span>
                            <Input
                                type={'text'}
                                pattern={'([+]{0,1}[0-9]{10,12})'}
                                // onChange={e => {
                                //     if (this.phoneRegEx.test(e.target.value))
                                //         this.state.userInfo.surname = e.target.value
                                // }}
                                defaultValue={this.state.userInfo.username}
                                readOnly={true}
                            />
                        </Label>
                        <GenderBlock>
                            <span>Пол</span>
                            <label>
                                <input
                                    type={"radio"}
                                    name={"gender"}
                                    value={'male'}
                                    onChange={e => {this.state.userInfo.gender = e.target.value}}
                                    ref={this.maleButton}
                                />
                                <span>Мужчина</span>
                            </label>
                            <label>
                                <input
                                    type={"radio"}
                                    name={"gender"}
                                    value={'female'}
                                    onChange={e => {this.state.userInfo.gender = e.target.value}}
                                    ref={this.femaleButton}
                                />
                                <span>Женщина</span>
                            </label>
                        </GenderBlock>
                            <Button
                                onClick={this.saveUserInfo}
                            >Сохранить</Button>
                    </div>
                </Form>
                <ReactNotification/>
                </React.Fragment>
            </ThemeProvider>
        );
    }

}


const Form = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    padding: 0 40px;
    grid-gap: 20px;
   
   .flatpickr-input {
        display: block;
        width: 90%;
        background: #fff;
        height: 30px; 
        border: ${props => props.theme.bgCol} 1px solid;
        border-radius: 10px;
        padding-left: 10px;
        font-size: 12pt;
        color: #000;
        outline: none;
   }
   .flatpickr-input.active{
        border: ${props => props.theme.primary_light} 1px solid;
        box-shadow: ${props => props.theme.primary_light} 0 0 2px 2px;
        outline: none;
   }
`;

const Input = styled.input`
    display: block;
    width: 90%;
    background: #fff;
    height: 30px; 
    border: ${props => props.theme.bgCol} 1px solid;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 12pt;
    color: #000;
    outline: none;
    &:focus{
      border: 1px solid ${props => props.theme.primary_light};
      box-shadow: ${props => props.theme.primary_light} 0 0 2px 2px;
    }
`;

const Label = styled.label`
    margin-top: 10px;
    display: block;
    span{
      display: block;
      margin-bottom: 5px;
    }  

`;

const Button = styled.button`
    width: calc(50% + 12px);
    margin-left: calc(25% - 12px);
    display: block;
    background: ${props => props.theme.primary};
    color: white;
    font-size: 1em;
    height: 34px;
    border-radius: 10px;
    border: none;
    margin-top: 34px;
    cursor: pointer; 
    outline: none;
    &:hover{
      background: ${props => props.theme.primary_light};
    }
`;

const GenderBlock = styled.div`
    margin-top: 10px;  
    span{
        display: block;
        margin-bottom: 5px;
    }  
    label {
        display: inline-block;
        margin-right: 10px;
        input, span {
        display: inline-block;
        cursor: pointer;
        }
    }
`;