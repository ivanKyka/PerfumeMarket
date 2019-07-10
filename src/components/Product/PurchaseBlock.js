import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import StarRatings from "react-star-ratings";
import {theme} from "../../stores/StyleStore";
import CartImage from '../../resources/image/ProductIcons/Group 2.svg'
import CardImage from '../../resources/image/ProductIcons/Vector.svg'
import LikeIcon from '../../resources/image/ProductIcons/Combined shape 14591.svg'
import FacebookIcon from '../../resources/image/ProductIcons/Facebook.svg'
import TwitterIcon from '../../resources/image/ProductIcons/Vector(1).svg'
import FiltersBlock from './FiltersBlock';
import Counter from "../public/Counter";
import {inject} from "mobx-react";

@inject('store')
export default class PurchaseBlock extends React.Component {


    addToCart = (() => {
        this.props.store.cart.addToCart({
            id: this.props.ProductID,
            price: this.price
        }, this.state.countOfProducts-0);
    })

    constructor(props) {
        super(props);
        this.state = {
            countOfProducts: 1,
            price: 0
        };
        this.price = 0;
    }

    setCountOfProducts = ((value) => {
        this.setState({
            countOfProducts: value
        });
    }).bind(this);

    render() {
        return(
        <Container>
            {''/*<Categories ProductID={this.props.ProductID}/>*/}
            <FiltersBlock ProductID={this.props.ProductID}/>
            <Query query={
                gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            price
                          }
                        }`
            }
                   variables={{"id":this.props.ProductID}}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                        this.price = data.product.price;

                        return(
                            <Price>Цена: {data.product.price * this.state.countOfProducts} грн.</Price>
                        );
                }}
            </Query>
            <Query query={
                gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            rating
                          }
                        }`
            }
                   variables={{"id":this.props.ProductID}}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                        return(
                            <StarRatings
                                rating={data.product.rating}
                                starRatedColor={"black"}
                                starEmptyColor={'gray'}
                                numberOfStars={5}
                                name='rating'
                                starDimension={'16px'}
                                starSpacing={'1px'}
                            />
                        );
                }}
            </Query>
            <AddToCartBlock>
                <Counter
                    setVal={this.setCountOfProducts}
                />
                <AddToCartButton
                    type="button"
                    theme={theme}
                    onClick={this.addToCart}>
                    <span>В корзину</span>
                    <object data={CartImage} type="image/svg+xml"/>
                </AddToCartButton>
            </AddToCartBlock>
            <BuyButton  theme={theme}>
                <span>КУПИТЬ</span>
                <object data={CardImage} type="image/svg+xml"/>
            </BuyButton>
            <Query query={
                gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            avaliable
                          }
                        }`
            }
                   variables={{"id":this.props.ProductID}}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    return(
                        <IsAvaliable>
                            <li><b>{data.product.avaliable?'В наличии':'Нет в наличии'}</b></li>
                        </IsAvaliable>
                    );
                }}
            </Query>
            <span>Поделиться</span>
            <SocialLinks theme={theme}>
                <img src={LikeIcon}/>
                <img src={FacebookIcon}/>
                <img src={TwitterIcon}/>
            </SocialLinks>
        </Container>
    )
    }
}

const Container = styled.div`
    display: grid;
    width: calc(100% - 60px);
    grid-template-rows: minmax(min-content, min-content) 80px 50px 60px 100px 30px 16px 55px;
    padding: 0 30px;
`;

const Price = styled.span`
    font-size: 25px;
    font-weight: bold;
    justify-self: left;
    align-self: center;
`;

const AddToCartBlock = styled.div`
    min-width: 300px;
    display: grid;
    grid-template-columns: 100px 1fr 170px;
`;

const AddToCartButton = styled.div`
    height: 38px;
    width: 100%;
    margin-top: 10px;
    background: ${props => props.theme.primary};
    grid-column: 3/4;
    border: 1px solid ${props => props.theme.primary_light};
    border-radius: 4px;
    text-align: left;
    color: white;
    display: grid;
    grid-template-columns: 1fr 50px;
    cursor: pointer;
    justify-items: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover{
      background: ${props => props.theme.primary_light};
    }
    span{
      font-size: 12pt;
      font-weight: bold;
      text-align: center;
      align-self: center;
    }
    svg {
      display: block;
      color: #fff;
      align-self: center;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      margin-top: 3px;
    }
`;

const BuyButton = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 3fr 1fr;
    height: 76px;
    margin: 10px 0;
    padding: 0;
    background: ${props => props.theme.primary};
    border: 2px solid ${props => props.theme.primary_light};
    border-radius: 10px;
    color: white;
    cursor: pointer;
    justify-items: center;
    align-items: center;
    &:hover{
      background: ${props => props.theme.primary_light};
    }
    span{
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      align-self: center;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    svg {
      color: #fff;
      align-self: center;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
`;

const SocialLinks = styled.div`
    width: calc(100% - 40px);
    display: grid;
    padding: 0;
    grid-template-columns: repeat(3, 40px);
    align-items: center;
    justify-items: left;
    grid-auto-rows: auto;
    grid-gap: 20px;

    img{
      cursor: pointer;
      padding: 7px 7px;
      height: 40px;
      width: 40px;
      border: 1px solid ${props => props.theme.bgCol};
      color: black;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 0px 2px rgba(255, 255, 255, 0.75);
      border-radius: 5px;
      &:hover{
         //background: ${props => props.theme.primary_light};
      }
    }
`;

const IsAvaliable = styled.ul`
    padding-left: 15px;
    margin-top: 0;
`;