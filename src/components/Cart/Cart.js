import React from 'react';
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Header from "../public/Header";
import Footer from "../public/Footer";
import HeadCatalog from "../public/HeadCatalog";
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class Cart extends React.Component {

    render() {
        return(
            <React.Fragment>
                <Header/>
                <HeadCatalog/>
                <Container>
                    <List>
                        {
                            this.props.store.cart.getAll().map(el => {
                                return <ProductCard ProductID={el.elem.id} Count={el.count}/>
                            })
                        }
                    </List>
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
    grid-template-columns: 3fr 1fr;
    padding: 20px 150px;
`;