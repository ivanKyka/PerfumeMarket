import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {theme} from "../../stores/StyleStore";
import {UrlStore} from "../../stores/UrlStore";
import Counter from "../public/Counter";
import ReactSelect from "react-select";
import {me} from "../../api/Users";
import {getCitiesByName, getPostOffices} from "../../api/NovaPoshta";
import Preloader from "../public/Preloader";
import Order from '../../entities/Order';
import {sendOrder} from "../../api/Order";
import {Link} from "react-router-dom";


export default class Checkout extends React.Component {

    setPostOffice = (option => {
        this.setState({
            cityName: option.label,
            cityCode: option.value.code,
            cityDescription: option.value.desc
        })
        if (option !== null)
            getPostOffices(option.value.code).then(data => {return data.map(elem => {
                return {
                    value: elem.Ref,
                    label: elem.Description
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
                    value: {code: elem.DeliveryCity, desc: elem.MainDescription},
                    label: elem.Present
                }
            })}).then(options => this.setState({
                cities: options
            }));
    }).bind(this);
    setCurrentPostOffice = (e => {
        this.setState({
            postOfficeName: e.label,
            postOfficeCode: e.value
        })
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            cart: [],
            modal: 'firstModal',
            cities: [],
            cityName: '',
            cityCode: '',
            postOffices: [],
            postOfficeName: '',
            postOfficeCode: '',
            cityDescription: '',
            name: '',
            surname: '',
            phone: '',
            postId: '',
            cityID: '',
            ready: false,
            response: {},
            key: 1
        }

        this.payment = 'nova_poshta';
        this.comment = '';

        this.setPayment = this.setPayment.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.setCount = this.setCount.bind(this);
        this.setComment = this.setComment.bind(this);
        this.postNextClick = this.postNextClick.bind(this);
    }

    setCount = id => {
        return (count => {
            let cart = this.state.cart.map(elem => {
                if (elem.product.id === id) elem.count = count;
                return elem;
            })
            this.setState({cart: cart})
        }).bind(this);
    }

    setComment = e => {
        this.comment = e.target.value;
    }

    componentWillMount() {
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
            } else this.setState({ready: true})
        });
    }

    saveData = e => {
        this.setState({
            modal: 'preloader'
        });
        let postData = {
            cityName: this.state.cityName,
            cityCode: this.state.cityCode,
            postOfficeName: this.state.postOfficeName,
            postOfficeCode: this.state.postOfficeCode,
            name: this.state.name,
            surname: this.state.surname,
            phone: this.state.phone,
            postId: this.state.postId,
            cityDescription: this.state.cityDescription,
            cityID: this.state.cityID
        }
        let order = new Order(this.comment, this.state.cart, postData, this.payment);
        sendOrder(order)
            .then(data => {
                if (this.payment === 'liqpay') {
                     this.setState({
                         response: data,
                         modal: 'payment'
                     })
                } else if (this.payment === 'nova_poshta') {
                    this.setState({
                        response: data[0],
                        modal: 'complete'
                    });
                }
            })

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

    setPayment = e =>{
        this.payment = e.target.value;
    }

    goToNext = e => {
        if (this.state.modal === 'firstModal')
            this.setState({modal: 'secondModal'});
        if (this.state.modal === 'secondModal') {
            this.saveData()
        }
    }

    goToPage = page => {
        this.setState({modal: page})
    }

    postNextClick = e => {
        if (this.payment === 'liqpay') {
           this.goToNext(e);
        }
        if (this.payment === 'nova_poshta') {
            this.saveData(e);
        }
    }

    goToPrev = () => {
        this.setState({modal: 'firstModal'});
    }

    render() {
    if (!this.state.ready) return <Modal open={this.props.open} onClose={this.props.closeCheckout}><Container><Preloader/></Container></Modal>
    switch (this.state.modal) {
        case 'firstModal': return(
            <Modal
                open={this.props.open}
                onClose={this.props.closeCheckout}
                onEntered={() => {
                    this.setState({cart: this.props.getCart().filter(elem => elem.product.avaliable), key: Math.random()});
                }}
            >
                <Container>
                    {this.state.cart.length === 0?<h1>Товара нет в наличии</h1>:''}
                    {this.state.cart.map( elem =>
                        <Query
                            key={elem.product.id}
                            query={
                            gql`query MyProductCategory($id: ID!){
                              product(id: $id){
                                photos{
                                  url
                                }
                                name_ru
                                avaliable
                                rating
                                price
                                vendor
                              }
                            }`
                        }
                        variables={{"id": elem.product.id}}
                        key={elem.product.id}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            const images = data.product.photos.map(a => a.url).reverse();
                            return(
                                    <ProductCard>
                                        <Image src={UrlStore.MAIN_URL + images[0]}/>
                                        <InfoBlock>
                                            <Name>{data.product.name_ru}</Name>
                                            <Counter setVal={this.setCount(elem.product.id)} defaultValue={elem.count} key={this.state.key}/>
                                            <Price>{data.product.avaliable?data.product.price + '₴':'Нет в наличии'}</Price>
                                        </InfoBlock>
                                    </ProductCard>

                            );
                        }}
                        </Query>)}
                    <AmountPrice>
                        <span>Всего:</span>
                        <Price>{this.state.cart.reduce((acc, el) =>  {
                            console.log(el);
                            return acc += el.count * el.product.price}, 0)
                        }₴</Price>
                    </AmountPrice>
                    <Comment placeholder={'Коментарии и пожелания'} onChange={this.setComment}/>
                    <DeliveryBlock>
                        <div>
                            <span>Способы оплаты</span>
                            <Select onChange={this.setPayment}>
                                <option value={'nova_poshta'}>Оплата наличными (Новая почта)</option>
                                <option value={'liqpay'}>Электронный платеж (Liqpay)</option>
                            </Select>
                        </div>
                        <Button onClick={this.goToNext} disabled={this.state.cart.length === 0}>Далее</Button>
                    </DeliveryBlock>
                </Container>
            </Modal>
        )
        case 'secondModal':     return(
            <Modal
                open={this.props.open}
                onClose={this.props.closeCheckout}
            >
                <Container>
                    <h3>Адрес доставки</h3>
                    <Form onSubmit={e => {
                        e.preventDefault();
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
                                <span>Отделение</span>
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
                            <ButtonBlock>
                                <BackButton onClick={this.goToPrev}>Назад</BackButton>
                                <Button onClick={this.postNextClick}>Сохранить</Button>
                            </ButtonBlock>
                        </div>
                    </Form>
                </Container>

            </Modal>
        )
        case 'payment': {
             return (
            <Modal
                open={this.props.open}
                onClose={this.props.closeCheckout}
            >
                <Container style={{justifyContent: 'center'}}>
                    <form method={'post'} action={'https://www.liqpay.ua/api/3/checkout'}>
                        <h3>Перейти к оплате</h3>
                        <input type="text" name={'data'} value={this.state.response.data} style={{display: 'none'}}/>
                        <input type="text" name={'signature'} value={this.state.response.signature} style={{display: 'none'}}/>
                        <Button>Оплата</Button>
                    </form>
                </Container>
            </Modal>)
        }
        case 'complete': return (
            <Modal
                open={this.props.open}
                onClose={this.props.closeCheckout}
            >
                <Container>
                    <h2>Заказ отправлен в обработку</h2>
                    <h3>Наш сотрудник свяжется с вами</h3>
                    <table>
                        <tbody>
                        <tr>
                            <td>Стоимость доставки: </td>
                            <td>{this.state.response.CostOnSite} грн</td>
                        </tr>
                        <tr>
                            <td>ТТН: </td>
                            <td>{this.state.response.IntDocNumber}</td>
                        </tr>
                        <tr>
                            <td>Предполагаемая дата доставки: </td>
                            <td>{this.state.response.EstimatedDeliveryDate}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Link to={'/'}><Button>На главную</Button></Link>
                </Container>
            </Modal>)
        case 'preloader': return(
            <Modal
                open={this.props.open}
                onClose={this.props.closeCheckout}
            >
                <Container>
                   <Preloader/>
                </Container>
            </Modal>)
    }
    }
}


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

const Container = styled.div`
    width: 600px;
    display: grid;
    padding: 20px;
    min-height: 300px;
    
    h2,h3 {
        text-align: center;
    }
    a {
    display: grid;
        button{
          justify-self: center;
        }
    }
`;

const ProductCard = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    padding: 10px;
    height: 100px;
    margin-bottom: 15px;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    
`;

const InfoBlock = styled.div`
    display: grid;
    grid-template-rows: min-content min-content;
    grid-template-columns: 1fr 1fr;
    padding-left: 20px;
`;

const Name = styled.p`
    font-size: 14px;
    color: ${theme.primary};
    padding-top: 5px;  
    margin: 0;
    grid-column: 1/3;
`;

const Price = styled.span`
    font-size: 24px;
    color: #575757;
    font-weight: bold;
    align-self: center;
    vertical-align: center;
`;


const DeliveryBlock = styled.div`
    display: grid;
    width: 100%; 
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px; 
    text-align: center;
    span {
        display: block;
    }
`;

const Select = styled.select`
    display: block;
    width: 100%;
    margin-top: 10px;
    border: 1px solid black;
    background: #ffffff;
    border-radius: 3px;
    height: 30px;
    font-size: 12pt;
    
    &:focus {
        border: 1px solid ${theme.primary_light};
        box-shadow: 0 0 1px 1px ${theme.primary_light};
    }
`;

const Button = styled.button`
    width: 200px;
    background: ${props => props.isDisabled?'gray':theme.primary};
    color: white;
    font-size: 12pt;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-top: 25px;
    cursor: ${props => props.isDisabled?'auto':'pointer'}; 
    &:hover{
      background: ${props => props.isDisabled?'gray':theme.primary_light};
    }
    
    &[disabled]{
        background: #bbb;
    }
`;

const BackButton = styled.button`
    width: 200px;
    background: #cccccc;
    color: #000000;
    font-size: 12pt;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-top: 25px;
    cursor: pointer; 
    &:hover{
      background: #bbbbbb;
    }
`;
const Form = styled.form`
    display: grid;
    grid-auto-rows: auto;
    padding: 0 40px;
    grid-gap: 20px;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    background: #fff;
    height: 34px; 
    border: ${theme.bgCol} 1px solid;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14pt;
    color: #000;
    &:focus{
      border: 1px solid ${theme.primary_light};
      box-shadow: ${theme.primary_light} 0 0 2px 2px;
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

const ButtonBlock = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    justify-content: space-between;
`;

const Comment = styled.textarea`
    resize: none;
    height: 100px;
    width: calc(100% - 30px);
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px 15px;
    box-shadow: #ccc 0 0 1px 1px;
    border: none;
    font-size: 12pt;
    &:focus {
      box-shadow: ${theme.primary_light} 0 0 2px 2px;
    }
`;

const AmountPrice = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    justify-content: space-between;
    margin: 10px 0;  
    align-items: center;
    width: 100%;
    padding-right: 30px;
`;