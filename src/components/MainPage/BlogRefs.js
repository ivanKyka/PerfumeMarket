import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import CatalogCard from "../Blog/CatalogCard";
import {Query} from "react-apollo";
import BlogCard from "./BlogCard";


export default class BlogRefs extends React.Component {

render() {
    return(
        <React.Fragment>
            <Title>НАШ БЛОГ</Title>
            <Container>
                <Query query={
                    gql`query ($limit: Int!, $startFrom: Int!, $sortOption: String!){
                              blogs(start: $startFrom, limit: $limit, sort: $sortOption) {
                                id
                                title
                                publishing
                                short_desc
                                header_photo {
                                  url
                                }
                                }
                            }`
                }
                       variables={{
                           limit: 4,
                           startFrom: 0,
                           sortOption: 'publishing:desc'
                       }}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p></p>;
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        return data.blogs.map(elem => <BlogCard Data={elem} key={elem.id}/>)
                    }}
                </Query>
            </Container>
        </React.Fragment>
    )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    justify-items: center;
`;

const Title = styled.h2`
    text-align: center;
    
`;