import React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select'
import {theme} from "../../stores/StyleStore";
import {getCitiesByName, getPostOffices} from "../../api/NovaPoshta";
import {me} from "../../api/Users";
import {changeUserData} from "../../api/Users";
import Preloader from "../public/Preloader";
import MetaTags from "react-meta-tags";
import ReactNotification, {store} from "react-notifications-component";
import Notification from "../public/Notification";
import ReactGA from "react-ga";

const reactSelectStyles = {
    container: styles => ({...styles, height: '38px', display: 'block'}),
    control: (styles, state) => (
        {...styles,
            boxShadow: state.isFocused?`${theme.primary_light} 0 0 2px 2px`:'none',
            border: state.isFocused?`1px solid ${theme.primary} !important`:'1px solid black',
            height: state.isFocused?'36px':'38px',
            borderRadius: '10px',
            cursor: 'text',
            '&:hover':{
                border: `1px solid black`,
            }
        }),
    dropdownIndicator: styles => ({...styles, color: 'black',cursor: 'pointer', '&:hover':{color: 'black'}}),
    indicatorSeparator: styles => ({...styles, backgroundColor: 'black', '&:hover':{backgroundColor: 'black'}}),
    input: styles => ({...styles, fontSize: '14pt', color: 'black', cursor: 'text'}),
    singleValue: styles  => ({...styles, color: 'black',fontSize: '12pt'}),
    clearIndicator: styles  => ({...styles, cursor: 'pointer'})
};



export default class Address extends React.Component {

    setPostOffice = (option => {
        this.setState({
            cityName: option.label,
            cityCode: option.value,
        })
        if (option !== null)
        getPostOffices(option.value).then(data => {return data.map(elem => {
            return {
                value: elem.Ref,
                label: elem.DescriptionRu
            }
        })}).then(options => this.setState({
            postOffices: options,
            cityName: option.label,
            postOfficeName: '',
            postOfficeCode: ''
        }))
        else this.setState({
            postOffices: [],
            postOfficeName: '',
            postOfficeCode: ''
        })
    }).bind(this);

    setCities = (name => {
        if (name.length >= 3)
            getCitiesByName(name).then(data => {return data.map(elem => {
                return {
                    value: elem.Ref,
                    label: elem.SettlementTypeDescriptionRu + ' ' + elem.DescriptionRu
                }
            })}).then(options => {
                console.log(options);
                this.setState({
                    cities: options
                })
            });
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            cities: [],
            cityName: '',
            cityCode: '',
            postOffices: [],
            postOfficeName: '',
            postOfficeCode: '',
            name: '',
            surname: '',
            phone: '',
            ready: false,
            cityDescription: ''
        }
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        me().then(data => {
            if (data !== false) {
                this.setState({
                    name: data.adress.name || '',
                    surname: data.adress.surname || '',
                    phone: data.adress.phone || '',
                    cityName: data.adress.cityName || '',
                    cityCode: data.adress.cityCode || '',
                    postOfficeName: data.adress.postOfficeName || '',
                    postOfficeCode: data.adress.postOfficeCode || '',
                    cityDescription: data.adress.cityDescription || '',
                    ready: true
                })
            }
        });
    }

    saveData = e => {
        let data = {};
        data.name = this.state.name;
        data.surname = this.state.surname;
        data.phone = this.state.phone;
        data.cityName = this.state.cityName;
        data.cityCode = this.state.cityCode;
        data.postOfficeName = this.state.postOfficeName;
        data.postOfficeCode = this.state.postOfficeCode;
        data.cityDescription = this.state.cityDescription;
        changeUserData({adress: data}).then(resp =>{
            if (resp) store.addNotification(Notification('Сохранено'));
        });

    }

    setName = e => {
        this.setState({
            name: e.target.value
        })
    }

    setSurname = e => {
        this.setState({
            surname: e.target.value
        })
    }
    
    setPhone = e => {
        this.setState({
            phone: e.target.value
        })
    }

    setCurrentPostOffice = (e => {
        this.setState({
            postOfficeName: e.label,
            postOfficeCode: e.value
        })
    }).bind(this);

render() {
    if (!this.state.ready) return <Preloader/>
    return(
        <React.Fragment>
            <MetaTags>
                <title>Адрес доставки</title>
            </MetaTags>
            <Form onSubmit={e => {
            e.preventDefault();
            console.log(this.state);
        }}>
            <div>
                <Label>
                    <span>Имя</span>
                    <Input type={'text'}
                           onChange={this.setName}
                           defaultValue={this.state.name}/>
                </Label>
                <Label>
                    <span>Фамилия</span>
                    <Input type={'text'}
                           onChange={this.setSurname}
                           defaultValue={this.state.surname}
                    />
                </Label>
                <Label>
                    <span>Телефон</span>
                    <Input type={'text'}
                           onChange={this.setPhone}
                           defaultValue={this.state.phone}
                    />
                </Label>
            </div>
            <div>
                <Label>
                    <span>Город</span>
                    <ReactSelect
                        noOptionsMessage={() => 'Введите ваш город'}
                        placeholder={''}
                        styles={reactSelectStyles}
                        onInputChange={e => {this.setCities(e)}}
                        onChange={this.setPostOffice}
                        options={this.state.cities}
                        value={{
                            label: this.state.cityName,
                            value: this.state.cityCode
                        }}
                        isClearable={true}
                    />
                </Label>
                <Label>
                    <span>Отделение Новой Пошты</span>
                    <ReactSelect
                        noOptionsMessage={() => 'Выберите отделение'}
                        placeholder={''}
                        styles={reactSelectStyles}
                        options={this.state.postOffices}
                        isClearable={true}
                        value={{
                            label: this.state.postOfficeName,
                            value: this.state.postOfficeCode
                        }}
                        onChange={this.setCurrentPostOffice}
                    />
                </Label>
                <Button onClick={this.saveData}>Сохранить</Button>
            </div>
        </Form>
        <ReactNotification/>
        </React.Fragment>
    )
    }
}

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: auto;
    padding: 0 40px;
    grid-gap: 20px;
`;

const Input = styled.input`
    display: block;
    width: 90%;
    background: #fff;
    height: 34px; 
    border: ${props => props.theme.bgCol} 1px solid;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14pt;
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
    width: 200px;
    background: ${props => props.theme.primary};
    color: white;
    font-size: 1em;
    height: 38px;
    border-radius: 10px;
    border: none;
    margin-top: 34px;
    margin-left: calc(50% - 100px);
    cursor: pointer; 
    outline: none;
    &:hover{
      background: ${props => props.theme.primary_light};
    }
`;
