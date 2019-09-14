import React from 'react';
import styled from 'styled-components';
import {theme} from "../../../stores/StyleStore";

export default class OrderHead extends React.Component {

    getStatusString = status => {
        switch (status) {
            case 'success': return 'Успешно доставлено'
            case 'error': return 'Ошибка'
            case 'processing': return 'Обрабатывается'
        }
    }

    render() {
        return(
            <Container  onClick={this.props.togglePane}>
                <Number>Заказ {this.props.order.id}</Number>
                <p>{new Date(this.props.order.createdAt).toLocaleString()}</p>
                <p>Статус доставки: {this.getStatusString(this.props.order.status)}</p>
                <p>Товаров: {this.props.order.orders.length}</p>
                <Price>Сумма: {this.props.order.orders.reduce((acc, elem) => {
                    return acc + elem.count * elem.product.price
                }, 0)} грн.</Price>
            </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px 150px 300px 80px 180px;
    justify-content: space-between;
    align-items: center;
    vertical-align: center;
    font-size: 9pt;
    height: 55px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    &:hover {
        background: #ffd5c5;
    }
    &:hover p:first-child {
        text-decoration: underline;
    }
`;

const Number = styled.p`
    color: ${theme.primary};
    text-decoration: dotted;
    
    &:hover {
        color: ${theme.primary_light};
    }
`;

const Price = styled.p`
    justify-self: right;
    padding-right: 10px;
`;