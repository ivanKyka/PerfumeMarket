import React from "react"
import styled from 'styled-components';
import Footer from "../public/Footer"
import Header from "../public/Header";
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dior from "../../resources/image/LogoBrand/dior.png";
import lor from "../../resources/image/LogoBrand/lor.png";
import pupa from "../../resources/image/LogoBrand/pupa.png";
import bour from "../../resources/image/LogoBrand/Bourjois.png";
import lacoste from "../../resources/image/LogoBrand/LACOSTE.png";
import shanel from "../../resources/image/LogoBrand/shanel.png";

export default class AboutUs  extends React.Component{

    render(){
        return(
            <React.Fragment>
                <Header/>
                <MainAbout>
                    <Title>
                        <h2> About Us </h2>
                    </Title>
                    <SomeText>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure rerum sint veniam!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    </SomeText>
                    <WhyOur>
                        <h3> Why choose us </h3>
                    </WhyOur>
                    <Advantages>
                        <Adv>
                            <TitleAdv>
                                <span> Cause </span>
                            </TitleAdv>
                            <Icon>
                            <FontAwesomeIcon icon={faCircle}/>
                            </Icon>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio enim excepturi, facilis omnis quia soluta velit. Aliquid aut cum deserunt dicta est illo laudantium magni, nihil nobis non quasi voluptas?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio enim excepturi, facilis omnis quia soluta velit. Aliquid aut cum deserunt dicta est illo laudantium magni, nihil nobis non quasi voluptas?</span>
                        </Adv>
                        <Adv>
                            <TitleAdv>
                                <span> Cause </span>
                            </TitleAdv>
                            <Icon>
                                <FontAwesomeIcon icon={faCircle}/>
                            </Icon>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio enim excepturi, facilis omnis quia soluta velit. Aliquid aut cum deserunt dicta est illo laudantium magni, nihil nobis non quasi voluptas?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio enim excepturi, facilis omnis quia soluta velit. Aliquid aut cum deserunt dicta est illo laudantium magni, nihil nobis non quasi voluptas?</span>
                        </Adv>
                        <Adv>
                            <TitleAdv>
                                <span> Cause </span>
                            </TitleAdv>
                            <Icon>
                                <FontAwesomeIcon icon={faCircle}/>
                            </Icon>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio enim excepturi, facilis omnis quia soluta velit. Aliquid aut cum deserunt dicta est illo laudantium magni, nihil nobis non quasi voluptas?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio enim excepturi, facilis omnis quia soluta velit. Aliquid aut cum deserunt dicta est illo laudantium magni, nihil nobis non quasi voluptas?</span>
                        </Adv>
                    </Advantages>
                    <WhyOur>
                        <h3> Our Brands </h3>
                    </WhyOur>
                    <LogoBrands>
                        <img src={dior} alt=""/>
                        <img src={lor} alt=""/>
                        <img src={pupa} alt=""/>
                        <img src={bour} alt=""/>
                        <img src={lacoste} alt=""/>
                        <img src={shanel} alt=""/>
                    </LogoBrands>
                </MainAbout>
                <Footer/>
            </React.Fragment>
        )
    }
}


const MainAbout = styled.div`
    display: grid;
    grid-template-rows: 80px 60px 60px 3fr 60px 2fr ;
    height: 1000px;
`
const Title = styled.div`
    justify-self: center;
    align-self: center;
`
const SomeText = styled.div`
    p{
     text-align: center;
     font-weight: bold;
     font-size: 12px;
     margin: 0;
    }
`
const WhyOur = styled.div`
    justify-self: center;
`
const Advantages = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const Adv = styled.div`
    justify-self: right;
    min-width: 300px;
    display: grid;
    grid-template-rows:1fr 3fr 3fr 
`
const TitleAdv = styled.div`
    justify-self: center;
    span{
      font-size: 16px;  
      font-weight: bold;  
     }
`
const Icon = styled.svg`
    height: 150px;
    width:150px;
    justify-self: center;
    color: #ccc;
    
    
`
const LogoBrands = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    height: 150px;
    width: calc(100% - 160px);
    justify-self: center;
    img{
      max-height: 100px;
      max-width: 140px;
      padding-left: 20px;
      display: block;
    }
    
`


