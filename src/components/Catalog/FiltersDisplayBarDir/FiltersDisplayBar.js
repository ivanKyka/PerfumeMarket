import React, {Component} from 'react'
import styled from 'styled-components'
import Query from "react-apollo/Query";
import CatalogStore from "../../../stores/CatalogStore";
import {toJS} from "mobx";
import gql from "graphql-tag";
import {observer} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'

@observer
export default class FiltersDisplayBar extends Component {
    render() {
        const filters = CatalogStore.filters;
        const filtersJS = toJS(filters);
        const propertiesIDs = filtersJS.properties._id_in;

        return (
            <Container>
                <Query
                    query={gql`query{
                        properties(limit: -1){
                            _id
                            property_val
                        }
                    }`}
                >
                    {({loading, error, data}) => {

                        if (data.properties)
                            return (
                                data.properties.map((el) => {
                                    if (propertiesIDs.includes(el._id))
                                        return (
                                            <FilterOption onClick={() => {
                                                CatalogStore.setFiltersFromLeftBar(el._id);
                                            }}>
                                                <FilterTitle>{el.property_val}</FilterTitle>
                                                <FontAwesomeIcon icon={faTimesCircle}/>
                                            </FilterOption>
                                        )
                                })
                            );
                        return null;
                    }}
                </Query>
            </Container>
        )
    }
}

const Container = styled.div`
  width: 80%;
  
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: center;
  clear: both;
`;

const FilterOption = styled.span`
    float: left;
    margin: 5px;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    cursor: pointer;
    
    > svg{
        width: 13px;
        height: 13px;
    }
    
    > *{
        margin-left: 5px;
    }
`;

const FilterTitle = styled.span`
    font-size: 13px;
`;