import React from 'react';
import styled from 'styled-components';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {UrlStore} from "../../../stores/UrlStore";

export default class ProductPane extends React.Component {

render() {
    return(
            <Query query={gql`
              query ($id: ID!){
                  product(id: $id){
                    _id
                    name_ru
                    photos{
                      url
                    }
                  price
                  }
                }  
            `}
            variables={{"id": this.props.order.product.id}}>
                {({loading, error,data}) => {
                    if (loading) return <p>Loading</p>
                    if (error) return <p>Error</p>
                    return <React.Fragment>
                                <PhotoNameBlock>
                                    <Photo src={UrlStore.MAIN_URL + data.product.photos[0].url}/>
                                    <Name>{data.product.name_ru}</Name>
                                </PhotoNameBlock>
                                <Count>{this.props.order.count} шт.</Count>
                                <Price>{this.props.order.count *
                                this.props.order.product.discount_price && this.props.order.product.discount_price > 0 ?
                                    this.props.order.product.discount_price : this.props.order.product.price} грн.</Price>
                            </React.Fragment>
                }}
            </Query>
    )
    }
}


const PhotoNameBlock = styled.div`
    grid-column: 3/4;
    display: grid;
    grid-template-columns: 70px 1fr;
`;

const Photo = styled.img`
    max-height: 60px;
    margin: 3px;
    padding: 2px;
    box-shadow: 0 0 2px 2px #bababa;
    display: block;
    border-radius: 3px;
`;

const Name = styled.p`
    align-self: center;
    justify-self: center;
    vertical-align: center;
`;

const Count = styled.p`
    grid-column: 4/5;
    align-self: center;
    vertical-align: center;    
`;

const Price = styled.p`
    grid-column: 5/6;
    align-self: center;
    justify-self: right;
    text-align: right;
`;