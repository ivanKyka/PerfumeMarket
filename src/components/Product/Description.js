import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import DescriptionBlock from './DescriptionBlock';
import styled from 'styled-components';

export default class Description extends React.Component {


    render() {
        return (
            <Container>
                <Query query={gql`query ($id: ID!){
  product(id: $id){
    descJSON
  }
}`} variables={{"id": this.props.ProductID}}>
                    {({loading, error, data}) => {
                        if (loading) return <p></p>;
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        return (
                            data.product.descJSON.map(elem => {
                                return (
                                    <DescriptionBlock elem={elem} key={elem.header}/>
                                );
                            })
                        )
                    }}
                </Query>
                <Query query={gql`query ($id: ID!){
                        product(id: $id){
                        properties {
                        property_name
                        property_val
                        }
                        }
                        }`} variables={{"id": this.props.ProductID}}>
                    {({loading, error, data}) => {
                        if (loading) return <p></p>;
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        let simplifiedData = data.product.properties.reduce((acc, el) => {
                            if (typeof acc[el.property_name] === 'undefined')
                                acc[el.property_name] = el.property_val;
                            else acc[el.property_name] += ', ' + el.property_val;
                            return acc;
                        }, {});
                        return (
                            <Table>
                                <thead>
                                <tr>
                                    <td>Характеристики</td>
                                </tr>
                                </thead>
                                <tbody>
                                {Array.from(Object.keys(simplifiedData)).map(elem => {
                                    return (
                                        <tr key={elem}>
                                            <td><b>{elem}:</b></td>
                                            <td>{simplifiedData[elem]}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        )
                    }}
                </Query>
                <SpecialOffer>
                    <SpecialOfferLogo>
                        <span>
                        <i>SPECIAL</i>
                        <i>&nbsp;&nbsp;OFFER</i>
                        </span>
                    </SpecialOfferLogo>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae expedita nostrum quas
                        unde
                    </p>
                </SpecialOffer>
            </Container>
        )
    }
}

const Table = styled.table`
    padding: 10px;
    border: 1px solid #cccccc;
    width: 100%;
    thead{
        display: block;
        font-size: 15px;
        border-bottom: 1px solid #cccccc;
        font-weight: bold;
        padding: 10px 0;
        width: 100%;
    }
    tbody {
        display: block;
        margin-top: 10px;
        font-size: 12px;
        
        td {
          padding-right: 10px;
        }
    }
    
    `;

const SpecialOffer = styled.div`
    display: grid;
    grid-template-columns: 57px 1fr;
    margin-top: 10px;

    p {
    align-self: center;
    margin: 0 0 0 10px;
    padding: 0;
    font-size: 12px;
    text-align: justify;
    }
    `;

const SpecialOfferLogo = styled.div`
    display: grid;
    height: 57px;
    border-radius: 50px;
    border: 1px solid #222222;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 0px 2px rgba(255, 255, 255, 0.75);
    justify-items: center;
    align-content: center;
    i {
    display: block;
    font-size: 9px;
    font-weight: bold;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }
    `;

const Container = styled.div`
    padding: 0 20px;
    
    `;