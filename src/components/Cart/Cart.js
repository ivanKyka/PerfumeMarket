import React from 'react';
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Header from "../public/Header";
import Footer from "../public/Footer";
import HeadCatalog from "../public/HeadCatalog";

export default class Cart extends React.Component {

    render() {
        return(
            <React.Fragment>
                <Header/>
                <HeadCatalog/>
                <Container>
                    <List>
                        <ProductCard ProductID={'5cefe7f8c7b5b13f78051f8d'} Count={1}/>
                        <ProductCard ProductID={'5ced9bacc7b5b13f7805157f'} Count={2}/>
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