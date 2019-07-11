import React from 'react';
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Header from "../public/Header";
import Footer from "../public/Footer";
import HeadCatalog from "../public/HeadCatalog";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import ManageCartPane from "./ManageCartPane";

@inject("store")
@observer
export default class Cart extends React.Component {

    render() {
        return(
            <React.Fragment>
                <Header/>
                <HeadCatalog/>
                <Container>
                    {this.props.store.cart.getAll().length > 0?
                    <React.Fragment>
                        <List>
                            {
                                this.props.store.cart.getAll().map(el => {
                                    return <ProductCard
                                        ProductID={el.product.id}
                                        Count={el.count}
                                        key={el.product.id}
                                    />
                                })
                            }
                        </List>
                        <ManageCartPane/>
                    </React.Fragment>
                        :<EmptyCart>
                        <h2>Корзина пока пуста :(</h2>
                        <p>Но может <ToMain to={'/'}>купим что-нибудь</ToMain>?</p>
                    </EmptyCart>}
                </Container>
                <Footer/>
            </React.Fragment>
        )
    }
}

const List = styled.div`
    display: grid;
    grid-gap: 10px;    
`;


const Container = styled.div`
    min-height: calc(100vh - 300px);
    display: grid;
    grid-template-columns: 5fr 2fr;
    
    
      @media(max-width: 1100px) {
        padding: 20px 20px;
      }
      @media(min-width: 1101px) {
        padding: 20px 150px;
      }
`;

const EmptyCart = styled.div`
  grid-column: 1/3;
    margin: 0 auto;
    width: 100%;
    height: 250px;
    text-align: center; 
    padding-top: 40px;
    
    h2{
      font-size: 24pt;
    }
    p{
      font-size: 18pt;
    }
`;

const ToMain = styled(Link)`
    cursor: pointer;
    font-size: 18pt;
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.primary}
    } 
`;