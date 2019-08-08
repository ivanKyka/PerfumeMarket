import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Header from "../public/Header";
import Footer from "../public/Footer";
import ReactMarkdown from 'react-markdown';
import RecomendedBlock from "./RecomendedBlock";

export default class BlogPage extends React.Component {

render() {
    return(
        <React.Fragment>
            <Header/>
            <Query query={
                gql`query ($id: ID!){
                          blog(id: $id){
                            id
                            title
                            publishing
                            newsBody
                            link
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
                        <Content>
                            <ReactMarkdown source={data.blog.newsBody}/>
                        </Content>
                    );
                }}
            </Query>
            <RecomendedBlock CurrentId={this.props.match.params.id}/>
            <Footer/>
        </React.Fragment>
    )
    }
}

const Content = styled.div`
    max-width: 900px;
    width: 100%;
    margin: 20px auto;
    padding: 10px;
    *{
        display: block;
    }
    
    img {
        width: 100%;
        margin-bottom: 20px;
    }
    
    p {
        font-size: 12pt;
        text-align: justify;
        letter-spacing: 1px;
        line-height: 140%;
    }
    
    em{
        margin-bottom: 10px;
    }
    
    h1,h2,h3,h4,h5,h6 {
        text-align: center;
    }
    
    li {
        display: list-item; 
        line-height: 140%;
    }
`;