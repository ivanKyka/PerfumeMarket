import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import {inject} from "mobx-react";

const base64DecodeUnicode = function(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
    let percentEncodedStr = atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');


    return decodeURIComponent(percentEncodedStr);
};

@inject('store')
export default class Order extends React.Component {

    constructor(props){
        super(props);
        let str = new URL(location.href).searchParams.get('postdata');
        str = base64DecodeUnicode(str);

        this.postdata = JSON.parse(str);
    }

render() {
        if (Array.isArray(this.postdata.data))
    return(
        <Container>
            <h2>Заказ отправлен в обработку</h2>
            <h3>Наш сотрудник свяжется с вами</h3>
            <table>
                <tbody>
                <tr>
                    <td>Стоимость доставки: </td>
                    <td>{this.postdata.data[0].CostOnSite} грн</td>
                </tr>
                <tr>
                    <td>ТТН: </td>
                    <td>{this.postdata.data[0].IntDocNumber}</td>
                </tr>
                <tr>
                    <td>Предполагаемая дата доставки: </td>
                    <td>{this.postdata.data[0].EstimatedDeliveryDate}</td>
                </tr>
                </tbody>
            </table>
            <Link to={'/'}><Button onClick={this.props.store.cart.clearCart}>Вернуться к покупкам</Button></Link>
        </Container>)

        else return <Container>
            <h2>Произошла ошибка</h2>
            <h3>Ошибка: {this.postdata.data.error}</h3>
            <Link to={'/'}><Button>На главную</Button></Link>
        </Container>

}
}

const Container = styled.div`
    display: grid;
    h2,h3 {
        text-align: center;
    }
    table{
      max-width: 600px;
      justify-self: center;
      
      td{
          padding-right: 20px;
      }
    }
    a {
    display: grid;
        button{
          justify-self: center;
        }
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