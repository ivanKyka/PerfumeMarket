import React from 'react';
import styled from 'styled-components';
import Categories from "./Categories";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import StarRatings from "react-star-ratings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus, faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import {faCreditCard} from "@fortawesome/free-regular-svg-icons";
import {faFacebook, faTwitterSquare, faTelegram, faVk} from "@fortawesome/free-brands-svg-icons";
import {theme} from "../../stores/StyleStore";

export default class PurchaseBlock extends React.Component {

    increaseCountOfProducts = (() => {
        this.setState(oldState => {
            return {
                countOfProducts: ++oldState.countOfProducts
            }
        })
    }).bind(this);
    decreaseCountOfProducts = (() => {
        this.setState(oldState => {
            if (oldState.countOfProducts > 1)
            return {
                countOfProducts: --oldState.countOfProducts
            }
        })
    }).bind(this);

    constructor(props) {
        super(props);
        this.state = {
            countOfProducts: 1
        }
    }

    render() {
        return(
        <Container>
            <Categories ProductID={this.props.ProductID}/>
            <Query query={
                gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            name_ru
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
                        <Price>{data.product.name_ru}</Price>
                    );
                }}
            </Query>
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
                        return(
                            <Price>Цена: {data.product.price * this.state.countOfProducts}</Price>
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
                <CountBlock>
                    <CountButton onClick={this.increaseCountOfProducts}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </CountButton>
                    <Count type="text" disabled={true} value={this.state.countOfProducts}/>
                    <CountButton onClick={this.decreaseCountOfProducts}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </CountButton>
                </CountBlock>
                <AddToCartButton type="button" theme={theme}>
                    <span>В корзину</span>
                    <FontAwesomeIcon icon={faCartArrowDown} size={'2x'}/>
                </AddToCartButton>
            </AddToCartBlock>
            <BuyButton  theme={theme}>
                <span>КУПИТЬ</span>
                <FontAwesomeIcon icon={faCreditCard} size={'3x'}/>
            </BuyButton>
            <SocialLinks theme={theme}>
                <FontAwesomeIcon icon={faFacebook} size={'3x'}/>
                <FontAwesomeIcon icon={faTwitterSquare} size={'3x'}/>
                <FontAwesomeIcon icon={faTelegram} size={'3x'}/>
                <FontAwesomeIcon icon={faVk} size={'3x'}/>
            </SocialLinks>
        </Container>
    )
    }
}

const Container = styled.div`
    display: grid;
    width: calc(100% - 60px);
    grid-template-rows: 60px minmax(min-content, min-content) 40px 35px 60px 100px 55px;
    padding: 30px;
`;

const Price = styled.span`
    font-size: 15pt;
    font-weight: bold;
    justify-self: left;
    align-self: center;
`;

const AddToCartBlock = styled.div`
    min-width: 300px;
    display: grid;
    grid-template-columns: 100px 1fr 170px;
`;

const CountBlock = styled.div`
    max-height: 50px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-column: 1/2;
`;

const CountButton = styled.button`
    border: 1px solid #ccc;
    border-radius: 1px;
    background: #ffffff;
    
    svg{
      color: black;
      cursor: pointer;
    }
`;

const Count = styled.input`
    width: 50px;
    background: #EEEEEE;
    color: black;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 13pt;
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
      color: #fff;
      align-self: center;
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
      font-size: 3vw;
      font-weight: bold;
      text-align: center;
      align-self: center;
    }
    svg {
      color: #fff;
      align-self: center;
    }
`;

const SocialLinks = styled.div`
    width: calc(100% - 40px);
    display: grid;
    padding: 0 20px;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
    grid-auto-rows: auto;
    
    svg{
      cursor: pointer;
      
      &:hover{
         color: ${props => props.theme.primary_light};
      }
    }
`;