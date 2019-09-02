import React from 'react';
import Header from "../public/Header";
import styled, {ThemeProvider} from 'styled-components'
import {theme} from "../../stores/StyleStore";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import CatalogCard from "./CatalogCard";
import Footer from "../public/Footer";
import Pagination from 'rc-pagination';
import './Pagination.css';

export default class Catalog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: 1
        }
        this.defaultPageSize = 15;
    }


    setPage = page => {
        this.setState({
            currentPage: page
        })
    };

    render() {
        return(
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Header/>
                    <Content>
                        <Query query={
                            gql`query ($limit: Int!, $startFrom: Int!, $sortOption: String!){
                              blogs(start: $startFrom, limit: $limit, sort: $sortOption) {
                                id
                                title
                                publishing
                                header_photo {
                                      url
                                    }
                                }
                            }`
                        }
                               variables={{
                                   limit: this.defaultPageSize,
                                   startFrom: (this.state.currentPage - 1) * this.defaultPageSize,
                                   sortOption: 'publishing:desc'
                               }}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p></p>;
                                if (error) {
                                    return <p>Error :(</p>;
                                }
                                return data.blogs.map(elem => <CatalogCard Data={elem} key={elem.id}/>)
                            }}
                        </Query>
                    </Content>
                    <PaginationWrapper>
                        <Query query={
                            gql`query{
                                  blogsConnection{
                                    aggregate{
                                      totalCount
                                    }
                                  }
                                }`
                        }

                        >
                            {({loading, error, data}) => {
                                if (loading) return <p></p>;
                                if (error) {
                                    return <p>Error :(</p>;
                                }
                                return <Pagination
                                    defaultCurrent={1}
                                    total={data.blogsConnection.aggregate.totalCount}
                                    defaultPageSize={this.defaultPageSize}
                                    hideOnSinglePage={true}
                                    onChange={this.setPage}
                                />
                            }}
                        </Query>
                    </PaginationWrapper>
                    <Footer/>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}

const Content = styled.div`
    display: grid;
    width: 100%;
    grid-gap: 50px;
    min-height: calc(100vh - 360px);
    @media(min-width: 1000px) {
      grid-template-columns: repeat(3, 300px);
    }
    @media(min-width: 650px) and (max-width: 999px){
      grid-template-columns: repeat(2, 300px);
    }
    @media(max-width: 649px) {
      grid-template-columns: 300px;
    }
    
    justify-content: center;
    grid-auto-rows: auto;
    margin: 20px auto;
`;

const PaginationWrapper = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
`;
