import React from 'react';
import styled from 'styled-components';
import PhotoGalerry from "./PhotoGalerry";
import PurchaseBlock from "./PurchaseBlock";
import Header from "../public/Header";
import HeadCatalog from '../public/HeadCatalog';
import Description from "./Description";
import CommentsContainer from "./CommentsContainer";
import Footer from "../public/Footer";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Links from "./Links";

export default class Product extends React.Component {


render() {
    return(
        <div>
            <Header />
            <HeadCatalog />
            <Container>
                <div>
                    <Query query={
                        gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            name_ru
                          }
                        }`
                    }
                           variables={{"id":this.props.match.params.id}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            return(
                                <ProductName>{data.product.name_ru}</ProductName>
                            );
                        }}
                    </Query>
                    <PhotoGalerry ProductID={this.props.match.params.id}/>
                </div>
                <PurchaseBlock ProductID={this.props.match.params.id}/>
                <Description ProductID={this.props.match.params.id}/>
            </Container>
                <Links/>
            <CommentsContainer ProductID={this.props.match.params.id}/>
            <Footer/>
        </div>
    )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr 5fr;
  min-height: calc(100vh - 412px);
  padding: 10px 150px;
`;

const ProductName = styled.p`
  font-size: 22px;
  width: 100%;
  font-family: "Gotham Pro Bold";
  padding-top: 0;
  margin-top: 0;
`;