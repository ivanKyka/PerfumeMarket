import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default class Categories extends React.Component {

render() {
    return(
        <Links>
            <Query query={
                gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            category {
                              name_ru
                              id
                              parent {
                                name_ru
                                id
                                parent{
                                  id
                                  name_ru
                                }
                              }
                            }

                          }
                        }`
            }
                   variables={{"id":this.props.ProductID}}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    try{
                        if (data.product.category.parent.parent === null)
                            return(
                                <div>
                                    <Link id={data.product.category.parent.id}
                                          theme={theme}>{data.product.category.parent.name_ru}</Link>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                    <Link id={data.product.category.id}
                                          theme={theme}>{data.product.category.name_ru}</Link>
                                </div>
                            );
                        else return(
                            <div>
                                <Link id={data.product.category.parent.parent.id}
                                      theme={theme}>{data.product.category.parent.parent.name_ru}</Link>
                                <FontAwesomeIcon icon={faChevronRight}/>
                                <Link id={data.product.category.parent.id}
                                      theme={theme}>{data.product.category.parent.name_ru}</Link>
                                <FontAwesomeIcon icon={faChevronRight}/>
                                <Link id={data.product.category.id}
                                      theme={theme}>{data.product.category.name_ru}</Link>
                            </div>
                        )
                    } catch (e) {
                        console.log(e);
                    }
                    return <div/>
                }}
            </Query>
        </Links>
    )
    }
}

const Links = styled.div`
  display: grid;
  grid-auto-rows: auto;
  align-items: center;
  svg {
    height: 10px;
    color: #777777;
  }  
`;

const Link = styled.span`
  font-size: 11pt;
  margin: 2px 0;
  display: inline-block;
  cursor: pointer;
  color: #777777;
  &:hover{
  text-decoration: underline;
  color: ${props => props.theme.primary}
  }
`;