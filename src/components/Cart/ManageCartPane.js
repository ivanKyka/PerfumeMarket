import React from 'react';
import styled from 'styled-components';
import {inject} from "mobx-react";

@inject('store')
export default class ManageCartPane extends React.Component {

render() {
    return(
        <Container>
            <Table>
                <tr>
                    <td>Всего</td>
                    <td>{this.props.store.cart.Total} грн</td>
                </tr>
                <tr>
                    <td>Доставка</td>
                    <td>Бесплатно</td>
                </tr>
                <tr>
                    <td>Промокод</td>
                    <td></td>
                </tr>
                <tr>
                    <td>К оплате</td>
                    <td>{this.props.store.cart.Total} грн</td>
                </tr>
            </Table>
        </Container>
    )
    }
}

const Container = styled.div`
    display: grid;
    padding: 10px;
    box-shadow: #ccc 0 0 2px 2px;  
    border-radius: 3px;
`;

const Table = styled.table`
    height: 150px;
    width: 100%;
    tr>td:last-child {
        float: right;
    }
    tr>td:first-child {
        float: left;
    }
`;