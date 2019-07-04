import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {inject} from "mobx-react";
import Counter from "../public/Counter";

@inject('store')
export default class ProductCard extends React.Component {

render() {
    return  (
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

                    const images = data.product.photos.map(a => a.url);
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
                                <Name>{data.product.name_ru}</Name>
                                <Vendor>{data.product.vendor}</Vendor>
                                <Price>{data.product.price}</Price>
                                <Counter/>
                            </React.Fragment>
                        )
                    }}
                </Query>
            </InfoBlock>
        </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 20px;
    padding: 10px;
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

const Name = styled.span`
    font-size: 14px;
    color: #4A4A4A;
    margin-bottom: 15px;
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