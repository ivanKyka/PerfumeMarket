import React from 'react';
import styled from 'styled-components';
import Query from 'react-apollo/Query'
import gql from "graphql-tag";
import Header from "../public/Header";
import Footer from "../public/Footer";
import ReactMarkdown from "react-markdown";
import ReactGA from "react-ga";
import MetaTags from "react-meta-tags";

export default class UserAgreement extends React.Component {

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
    }

    render() {
        return(
            <React.Fragment>
                <Header/>
                <Content>
                    <Query query={gql`
                   query {
                    useragreements{   
                        text
                        meta_title
                        meta_keywords
                        meta_decription
                      }
                    } 
                `}>
                        {({loading, error, data})=> {
                            if (loading) return <p/>
                            if (error) return <p>Error :)</p>
                            return <>
                                <MetaTags>
                                    <meta name='title' content={data.useragreements[0].meta_title}/>
                                    <meta name='keywords' content={data.useragreements[0].meta_keywords}/>
                                    <meta name='decription' content={data.useragreements[0].meta_decription}/>
                                </MetaTags>
                                <ReactMarkdown source={data.useragreements[0].text}/>
                            </>
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