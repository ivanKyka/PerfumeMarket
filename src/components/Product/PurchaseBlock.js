import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import StarRatings from "react-star-ratings";
import {theme} from "../../stores/StyleStore";
import CartImage from '../../resources/image/ProductIcons/Group 2.svg'
import CardImage from '../../resources/image/ProductIcons/Vector.svg'
import LikeIcon from '../../resources/image/ProductIcons/Combined shape 14591.svg'
import FacebookIcon from '../../resources/image/ProductIcons/Facebook.svg'
import TwitterIcon from '../../resources/image/ProductIcons/Twitter.svg'
import Counter from "../public/Counter";
import {inject} from "mobx-react";
import Categories from "./Categories";
import {AddToWishList} from "../../api/WishList";
import {FacebookShareButton, TwitterShareButton} from "react-share";
import {UrlStore} from "../../stores/UrlStore";
import Checkout from "../Checkout/Checkout";

@inject('store')
export default class PurchaseBlock extends React.Component {

    addToCart = (() => {
        this.props.store.cart.addToCart({
            id: this.props.ProductID,
            price: this.price,
            avaliable: this.avaliable
        }, this.state.countOfProducts - 0);
    })

    constructor(props) {
        super(props);
        this.state = {
            countOfProducts: 1,
            price: 0,
            checkoutOpen: false
        };
        this.price = 0;
        this.avaliable = true;

        this.closeCheckout = this.closeCheckout.bind(this);
        this.openCheckout = this.openCheckout.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.setCountOfProducts = this.setCountOfProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    getProduct = () => {
        return [{product: {
            id: this.props.ProductID,
            avaliable: this.avaliable,
            price: this.price - 0
            }, count: this.state.countOfProducts}]
    }

    openCheckout = e => {
        e.preventDefault();
        this.setState({checkoutOpen: true})
    }

    setCountOfProducts = ((value) => {
        this.setState({
            countOfProducts: value
        });
    }).bind(this);

    closeCheckout = e => {
        e.preventDefault();
        this.setState({checkoutOpen: false})
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Categories ProductID={this.props.ProductID}/>
                    <Query query={
                        gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            price
                          }
                        }`
                    }
                           variables={{"id": this.props.ProductID}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            this.price = data.product.price;

                            return (
                                <Price>Цена: {data.product.price} грн.</Price>
                            );
                        }}
                    </Query>
                    <Query query={
                        gql`query ($id: ID!){
                              commentsConnection(where: 
                            {product:{_id:$id}}){
                              aggregate{
                                avg{
                                  rate
                                }
                              }
                            }
                            }`
                    }
                           variables={{"id": this.props.ProductID}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }

                            return (
                                <StarRatings
                                    rating={data.commentsConnection.aggregate.avg.rate || 0}
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
                    <Query query={
                        gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            avaliable
                          }
                        }`
                    }
                           variables={{"id": this.props.ProductID}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            this.avaliable = data.product.avaliable;
                            return (
                                <React.Fragment>
                                    <AddToCartBlock>
                                        <Counter
                                            setVal={this.setCountOfProducts}
                                        />
                                        {data.product.avaliable?<AddToCartButton
                                            onClick={this.addToCart}>
                                            <span>В корзину</span>
                                            <object data={CartImage} type="image/svg+xml"/>
                                        </AddToCartButton>:''}
                                    </AddToCartBlock>
                                    <BuyButton
                                        onClick={data.product.avaliable?this.openCheckout:(e) => {}}
                                        disabled={data.product.avaliable}
                                    >
                                        {data.product.avaliable ? <React.Fragment>
                                                <span>КУПИТЬ</span>
                                                <object data={CardImage} type="image/svg+xml"/>
                                            </React.Fragment> :
                                            <span>Нет в наличии</span>}
                                    </BuyButton>
                                </React.Fragment>
                            );
                        }}
                    </Query>
                    <span>Поделиться</span>
                    <SocialLinks>
                        <img
                            src={LikeIcon}
                            onClick={e => {
                                e.preventDefault();
                                AddToWishList(this.props.ProductID);
                            }}
                        />
                        <TwitterShare url={UrlStore.MAIN_URL + location.pathname}/>
                        <FacebookShare url={UrlStore.MAIN_URL + location.pathname}/>
                    </SocialLinks>
                    <Checkout open={this.state.checkoutOpen} closeCheckout={this.closeCheckout} getCart={this.getProduct}/>
                </Container>
            </ThemeProvider>
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
    grid-template-columns: ${props => props.disabled ? '3fr 1fr' : '1fr'};
    height: 76px;
    margin: 10px 0;
    padding: 0;
    background: ${props => props.disabled ? props.theme.primary : '#bbb'};
    border: 2px solid ${props => props.disabled ? props.theme.primary_light : '#bbb'};
    border-radius: 10px;
    color: white;
    cursor: pointer;
    justify-items: center;
    align-items: center;
    &:hover{
      background: ${props => props.disabled ? props.theme.primary_light : '#bbb'};
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.75);
      border-radius: 5px;
      &:hover{
          box-shadow:  inset 2px 2px 2px rgba(255, 255, 255, 0.75);
      }
      
      &:active {
          box-shadow: 0 0 3px 3px rgba( 204,204,204,0.5);
          background: rgba( 204,204,204,0.5);
      }

    }
`;

const IsAvaliable = styled.ul`
    padding-left: 15px;
    margin-top: 0;
`;

const TwitterShare = styled(TwitterShareButton)`
    display: block;
    height: 40px;
    width: 40px;
    background-image: url(${TwitterIcon});
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.bgCol};
    color: black;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.75);
    cursor: pointer;
    &:hover{
        box-shadow:  inset 2px 2px 2px rgba(255, 255, 255, 0.75);
    }
`;

const FacebookShare = styled(FacebookShareButton)`
    display: block;
    height: 40px;
    width: 40px;
    background-image: url(${FacebookIcon});
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.bgCol};
    color: black;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.75);
    cursor: pointer;
    &:hover{
        box-shadow:  inset 2px 2px 2px rgba(255, 255, 255, 0.75);
    }
`;