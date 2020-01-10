import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {inject} from "mobx-react";
import Counter from "../public/Counter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import ReactNotification, {store} from "react-notifications-component";
import Notification from "../public/Notification";

@inject('store')
export default class ProductCard extends React.Component {

    setCountHandler = (val => {
        this.setState({
            countOfProducts: val
        });
        this.props.store.cart.setCount(this.props.ProductID, val);
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            countOfProducts: props.Count
        }
    }

    deleteFromCart = (e => {
        e.preventDefault();
        this.props.store.cart.removeFromCart(this.props.ProductID);
        store.addNotification(Notification('Товар удален из корзины'));
    }).bind(this);

render() {
    return  (
        <ThemeProvider theme={theme}>
            <Container>
                <Query query={gql`query ProductPhotos($id: ID!){
                                      product(id: $id){
                                            photos{
                                              url
                                            }
                                          }
                                        }`}
                       variables={{"id": this.props.ProductID}}>
                    {({loading, error, data}) => {
                        if (loading) return <p></p>;
                        if (error) {
                            return <p>Error :(</p>;
                        }

                        const images = data.product.photos.map(a => a.url).reverse();
                        return (
                            <Image src={this.props.store.urlStore.MAIN_URL + images[0]}/>
                        )
                    }}
                </Query>
                <InfoBlock>
                    <Query query={gql`query ($id: ID!){
                                          product(id: $id){
                                            name_ru
                                            price
                                            vendor
                                            avaliable
                                            discount_price
                                            amount
                                              }
                                            }`}
                           variables={{"id": this.props.ProductID}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            if (data.product.amount < this.props.Count) {
                                this.props.store.cart.setCount(this.props.ProductID, data.product.amount);
                            }
                            if (!data.product.avaliable && this.props.store.cart.getElemFromCart(this.props.ProductID).count > 0){
                                this.props.store.cart.setCount(this.props.ProductID, 0);
                            }
                            if (data.product.discount_price > 0 && data.product.discount_price < this.props.Price) {
                                this.props.store.cart.setPrice(this.props.ProductID, data.product.discount_price);
                            }
                            return (
                                <DescriptionBlock>
                                    <Name
                                        to={'/product/' + this.props.ProductID}
                                    >{data.product.name_ru}</Name>
                                    <Vendor>{data.product.vendor}</Vendor>
                                    {data.product.avaliable && data.product.amount > 0?
                                        data.product.discount_price > 0?
                                            <div>
                                                <OldPrice>{data.product.price}</OldPrice>
                                                <Price>{data.product.discount_price} грн.</Price>
                                            </div>:
                                            <Price>{data.product.price} грн.</Price>:
                                        <Price>Нет в наличии</Price>}
                                    {data.product.avaliable && data.product.amount > 0?
                                        <Counter setVal={this.setCountHandler}
                                                 defaultValue={data.product.amount > this.props.Count?this.props.Count:data.product.amount}
                                                 max={data.product.amount}/>:''}
                                </DescriptionBlock>
                            )
                        }}
                    </Query>
                </InfoBlock>
                <CloseButton onClick={this.deleteFromCart}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        size={'lg'}
                    />
                </CloseButton>
                <ReactNotification/>
            </Container>
        </ThemeProvider>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 30px;
    padding: 10px;
   
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    
`;

const InfoBlock = styled.div`
    display: grid;
    grid-template-rows: repeat(4, min-content) ;
    padding-left: 20px;
`;

const Name = styled(Link)`
    font-size: 14px;
    margin-bottom: 15px;
    color: ${props => props.theme.primary};
    
    &:hover {
      color: ${props => props.theme.primary_light};
      text-decoration: underline;
    }    
`;
const Vendor = styled.span`
    font-size: 16px;
    color: #4A4A4A;
    margin-bottom: 10px;

`;
const Price = styled.span`
    display: inline-block;
    font-size: 24px;
    color: #4A4A4A;
    font-weight: bold;
    margin-bottom: 10px;
    margin-right: 10px;
`;

const OldPrice = styled(Price)`
    text-decoration: line-through;
    color: #661412;
    font-size: 20px;
`;

const DescriptionBlock = styled.div`
    display: grid;
    padding: 10px;  
   
`;

const CloseButton = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50px;
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    transition: .2s ease-out;
    &:hover{
      background: rgba(50, 50, 50, 0.5);
      color: #222;
    }
`;