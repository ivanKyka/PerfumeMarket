import React from "react"
import styled from 'styled-components';
import Footer from "../public/Footer"
import Header from "../public/Header";
import ReactMarkdown from "react-markdown";
import Query from "react-apollo/Query";
import gql from "graphql-tag";
import {UrlStore} from "../../stores/UrlStore";
import MetaTags from 'react-meta-tags';
import ReactGA from "react-ga";

export default class AboutUs  extends React.Component{

    componentWillMount() {
        window.scrollTo(0,0);
        ReactGA.pageview(location.pathname);
    }

    render(){
        return (
            <React.Fragment>
                <MetaTags>
                    <title>О нас</title>
                </MetaTags>
                <Header/>
                <MainAbout>
                    <Title>
                        <h2> О НАС </h2>
                    </Title>
                    <Query
                        query={gql`
                            query{
                              aboutuses{
                                first_block
                                second_block
                                third_block
                                meta_title
                                meta_keywords
                                meta_decription
                                brands {
                                  url
                                }
                              }
                            }
                        `}
                    >
                        {({loading, error, data}) => {
                            if (loading) return <p/>
                            if (error) return <p/>

                            return (
                                <React.Fragment>
                                    <MetaTags>
                                        <meta name='title' content={data.aboutuses[0].meta_title}/>
                                        <meta name='keywords' content={data.aboutuses[0].meta_keywords}/>
                                        <meta name='decription' content={data.aboutuses[0].meta_decription}/>
                                    </MetaTags>
                                    <Articles>
                                        <div>
                                            <ReactMarkdown source={data.aboutuses[0].first_block||''}/>
                                        </div>
                                        <div>
                                            <ReactMarkdown source={data.aboutuses[0].second_block||''}/>
                                        </div>
                                        <div>
                                            <ReactMarkdown source={data.aboutuses[0].third_block||''}/>
                                        </div>
                                    </Articles>
                                    <Title> У нас в продаже: </Title>
                                    <BannerImg src={UrlStore.MAIN_URL + data.aboutuses[0].brands[0].url}/>
                                </React.Fragment>
                            )
                        }}
                    </Query>
                </MainAbout>
                <Footer/>
            </React.Fragment>
        );
    }
}


const MainAbout = styled.div`
    display: grid;
    min-height: calc(100vh - 360px);
`
const Title = styled.div`
    justify-self: center;
    align-self: center;
`

const BannerImg = styled.img`
    width: 90%;
    margin: 50px 5%;
    
`;

const Articles = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;
    text-align: center;
    @media(min-width: 1000px){
        margin: 5vw;
        width: 90vw;
    }   
    @media(max-width: 1000px){
        margin: 10px;
        width: calc(100vw - 20px);
    }   
    
    img {
        max-width: 90%;
        margin: 10px auto;
        object-fit: contain;
    }
`;