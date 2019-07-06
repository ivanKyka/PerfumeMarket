import React from 'react';
import styled from 'styled-components';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Times from '../../resources/image/ProductIcons/times.svg'

export default class FiltersBlock extends React.Component {

render() {
    return(
        <Container>
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
                    return (
                        <List>
                            {data.product.properties.map((elem, index) =>
                                <FilterBlock key={elem.property_name + index}>
                                    <span>{elem.property_val}</span>
                                    <img src={Times} alt=""/>
                                </FilterBlock>
                            )}
                        </List>
                    )
                }}
            </Query>
        </Container>
    )
    }
}

const Container = styled.div`
    display: block;
    
`;

const List = styled.div`
    display: block;
    
`;

const FilterBlock = styled.div`
    display: inline-block;
    margin-right: 7px;
    height: 10px;
    cursor: pointer;

    span {
      height: 10px;
      font-size: 11px;
      margin-right: 4px;
    }
    
    img {
      margin-bottom: -2px;
    }
    
    
`;