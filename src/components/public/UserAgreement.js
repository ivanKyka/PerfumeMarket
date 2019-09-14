import React from 'react';
import styled from 'styled-components';
import Query from 'react-apollo/Query'
import gql from "graphql-tag";
import Header from "./Header";
import Footer from "./Footer";
import ReactMarkdown from "react-markdown";

export default class UserAgreement extends React.Component {


    render() {
        return(
            <React.Fragment>
                <Header/>
                <Content>
                    <Query query={gql`
                   query {
                    additionaldata{   
                        user_agreement
                      }
                    } 
                `}>
                        {({loading, error, data})=> {
                            if (loading) return <p/>
                            if (error) return <p>Error :)</p>
                            return <ReactMarkdown source={data.additionaldata[0].user_agreement}/>
                        }}
                    </Query>
                </Content>
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
    display: block;
    min-height: calc(100vh - 360px); 
    
    *{
        display: block;
    }
    
    a {
        display: inline-block;
    }
    
    img {
        max-width: 100%;
        object-fit: contain;
        margin: auto;
        margin-bottom: 20px;
    }
    
    p {
        font-size: 12pt;
        text-align: justify;
        letter-spacing: 0px;
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