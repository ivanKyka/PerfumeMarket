import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {inject} from "mobx-react";
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@inject('store')
export default class ManageCartPane extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Table>
                        <tbody>
                        <tr>
                            <td>Всего</td>
                            <td>{this.props.store.cart.Total} грн</td>
                        </tr>
                        <tr>
                            <td>Доставка</td>
                            <td>Бесплатно</td>
                        </tr>

                        <tr>
                            <td>К оплате</td>
                            <td>{this.props.store.cart.Total} грн</td>
                        </tr>
                        </tbody>
                    </Table>
                    <br/>
                    <Button onClick={this.props.openCheckout}>Купить</Button>
                </Container>
            </ThemeProvider>
        )
    }
}

//                        <tr>
//                             <td>Промокод</td>
//                             <td>
//                                 <AddInviteButton>
//                                     <FontAwesomeIcon icon={faPlus} size={'1x'}/>
//                                 </AddInviteButton>
//                             </td>
//                         </tr>

const Container = styled.div`
    display: grid;
    padding: 10px;
    box-shadow: #ccc 0 0 2px 2px;  
    border-radius: 3px;
    height: 250px;
`;

const Table = styled.table`
    width: 100%;
    height: 150px;
    
    tr {
      height: 20px;
    }
    
    tr>td:last-child {
        float: right;
    }
    tr>td:first-child {
        float: left;
    }
    border-bottom: 1px solid #cccccc;
`;

const Button = styled.button`
    justify-self: center;  
    width: 120px;
    height: 50px;
    background: none;
    border: none;
    font-size: 35px;
    color: ${props => props.theme.primary};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: ${props => props.theme.primary_light};
    }
    &:active{
        outline: none;
    }
    
`;

const AddInviteButton = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    background: ${props => props.theme.primary};
    cursor: pointer;
    
    &:active {
      background: ${props => props.theme.primary_light};
    }
    
    svg {
      color: white;
      height: 20px;
      width: 20px;
    }
   
`;