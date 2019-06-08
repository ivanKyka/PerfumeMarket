import React from 'react';
import styled from 'styled-components';
import Footer from "../public/Footer"
import Header from "../public/Header";

export default class Preference extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <Main>
                    <Title>
                        <h2> Personal account </h2>
                    </Title>
                    <Menu>
                        <ul>
                            <li><a href="Address.js"> Contact Information </a></li>
                            <li><a href=""> Address </a></li>
                            <li><a href=""> I want it </a></li>
                            <li><a href=""> Purchase history </a></li>
                            <li><a href=""> Exit </a></li>
                        </ul>
                    </Menu>
                    <Page>
                        <TitleColumn>
                            <p> Categories</p>
                        </TitleColumn>
                        <TitleColumnSecond>
                            <p> 0 products</p>
                        </TitleColumnSecond>
                        <Link>
                            <ul>
                                <p><a href=""All></a></p>
                            </ul>
                        </Link>

                    </Page>
                </Main>
                <Footer/>
            </div>
        )
    }
}
const Main = styled.div`
    display: grid;
    background-color: white;
    height: 1000px;
    grid-template-rows: 80px 80px 800px;
`;
const Title = styled.div`
    justify-self: center;
    align-self: center;
`
const Menu = styled.div`
    justify-self: center;
    font-size: 20px;
    ul{
      life-style: none;
    }
    li{
      display: inline;
      margin: 0 80px
    }
    a{
      text-decoration: none;
      color: #ccc;
      cursor: pointer;
        &:hover{
          text-decoration: underline;
          color: #000;
        }
     }
`
const Page = styled.div`
    justify-self: center;
    display: grid;
    grid-template-rows: 50px 800px;
    grid-template-columns: 1fr 780px;
    width: 1380px;
`
const TitleColumn = styled.div`
    margin-left: 120px;
`
const TitleColumnSecond = styled.div`
    justify-self: center;
`
const Link = styled.div`
    margin-left: 120px;
    
    a{
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 22px;
      &:hover{
          text-decoration: underline;
          
        }
      
    }
`

