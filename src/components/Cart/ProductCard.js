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
                                              }
                                            }`}
                           variables={{"id": this.props.ProductID}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }

                            return (
                                <React.Fragment>
                                    <Name
                                        to={'/product/' + this.props.ProductID}
                                    >{data.product.name_ru}</Name>
                                    <Vendor>{data.product.vendor}</Vendor>
                                    <Price>{data.product.price}грн * {this.state.countOfProducts}</Price>
                                    <Counter setVal={this.setCountHandler} defaultValue={this.props.Count}/>
                                </React.Fragment>
                            )
                        }}
                    </Query>
                </InfoBlock>
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={this.deleteFromCart}
                />
            </Container>
        </ThemeProvider>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 20px;
    padding: 10px;
    
    svg{
      cursor: pointer;
      color: #aaa;
      
      &:hover {
        color: #222;
      }
    }
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    
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
    font-size: 24px;
    color: #4A4A4A;
    font-weight: bold;
    margin-bottom: 10px;
`;