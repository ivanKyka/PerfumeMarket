import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css';
import {Russian} from "flatpickr/dist/l10n/ru";
import {inject} from "mobx-react";
import {changeUserData} from "../../api/Users";

@inject('store')
export default class Contacts extends React.Component{

    saveUserInfo = (e => {
        e.preventDefault();
        changeUserData(this.userInfo)
            .then(respose => {
                if (respose){
                   location.reload();
                }
                alert('failed');
            })
    }).bind(this);

    constructor(props){
        super(props);
        this.userInfo = props.store.userStore.getUser();
        this.phoneRegEx = /[+]?[0-9]{10,12}/;
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <Form>
                <div>
                    <Label>
                        <span>Имя</span>
                        <Input
                            type={'text'}
                            onChange={e => {this.userInfo.name = e.target.value}}
                        />
                    </Label>
                    <Label>
                        <span>Фамилия</span>
                        <Input
                            type={'text'}
                            onChange={e => {this.userInfo.surname = e.target.value}}
                        />
                    </Label>
                    <Label>
                        <span>E-mail</span>
                        <Input
                            type={'text'}
                        />
                    </Label>
                </div>
                <div>
                    <Label>
                        <span>Дата рождения</span>
                        <Flatpickr
                            options={{
                                locale: Russian,
                                dateFormat: 'd.m.Y'
                            }}
                            onChange={date => {this.userInfo.birthday =  date[0].toISOString()}}
                        />
                    </Label>
                    <Label>
                        <span>Телефон</span>
                        <Input
                            type={'text'}
                            pattern={'([+]{0,1}[0-9]{10,12})'}
                            onChange={e => {
                                if (this.phoneRegEx.test(e.target.value))
                                    this.userInfo.surname = e.target.value
                            }}
                        />
                    </Label>
                        <Button
                            onClick={this.saveUserInfo}
                        >Сохранить</Button>
                </div>
            </Form>
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
   }
   .flatpickr-input.active{
        border: ${props => props.theme.primary_light} 2px solid;
        height: 28px;
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
    &:focus{
      border: ${props => props.theme.primary_light} 2px solid;
      height: 28px;
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
    &:hover{
      background: ${props => props.theme.primary_light};
    }
`;
