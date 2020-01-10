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
import AddComentModalPane from "./AddComentModalPane";
import MetaTags from "react-meta-tags";
import Recomendations from "../public/Recomendations";
import ReactGA from "react-ga";

export default class Product extends React.Component {

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    render() {
        window.scrollTo(0,0);

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
                            vendor
                            meta_title
                            meta_keywords
                            meta_decription
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
                                <React.Fragment>
                                    <MetaTags>
                                        <title>{data.product.name_ru}</title>
                                        <meta name='title' content={data.product.meta_title}/>
                                        <meta name='keywords' content={data.product.meta_keywords}/>
                                        <meta name='decription' content={data.product.meta_decription}/>
                                    </MetaTags>
                                    <ProductName>{data.product.name_ru}</ProductName>
                                    <Vendor>{data.product.vendor}</Vendor>
                                </React.Fragment>

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
            <Recomendations/>
            <Footer/>
        </div>
    )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr 5fr;
  min-height: calc(100vh - 412px);
  
  @media(min-width: 1366px){
      padding: 10px 150px;
  }
  @media(max-width: 1365px) {
    padding: 10px;
  }
`;

const ProductName = styled.p`
  font-size: 22px;
  width: 100%;
  font-family: "Gotham Pro Bold";
  padding-top: 0;
  margin-top: 0;
  margin: 0;
  padding: 0;
`;

const Vendor = styled.span`
    color: #666666;
    width: 100%;
    display: block;
    margin: 5px 0;
`;