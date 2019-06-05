import React from 'react';
import styled from 'styled-components';
import Footer from "../public/Footer"
import Header from "../public/Header";

export default class Contact extends React.Component {

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
                        <li><a href="Contact.js"> Contact Information </a></li>
                        <li><a href=""> Address </a></li>
                        <li><a href=""> I want it </a></li>
                        <li><a href=""> Purchase history </a></li>
                        <li><a href=""> Exit </a></li>
                    </ul>
                </Menu>
                <Form>
                    <TitleColumn>
                        <p> Edit personal data </p>
                    </TitleColumn>
                    <TitleColumn>

                    </TitleColumn>
                    <TitleColumn>
                        <p> Change password </p>
                    </TitleColumn>
                    <Inp>
                        <label htmlFor=""> First Name</label><br/>
                        <Input type="text"/>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> Birthday</label><br/>
                        <Input type="text"/>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> Old Password</label><br/>
                        <Input type="password"/>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> Last Name</label><br/>
                        <Input type="text"/>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> Phone</label><br/>
                        <Input type="text"/>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> New Password</label><br/>
                        <Input type="password"/>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> E-mail</label><br/>
                        <Input type="email"/>
                    </Inp>
                    <Inp>
                    </Inp>
                    <Inp>
                        <label htmlFor=""> Confirm Password</label><br/>
                        <Input type="password"/>
                        <Button>Save</Button>
                    </Inp>
                </Form>
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
const Form = styled.div`
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px 100px 100px 150px ;
    width: 1380px;
`
const TitleColumn = styled.div`
    margin-left: 120px;
`
const Inp = styled.div`
    margin-left: 120px;
`
const Input = styled.input`
    outline: none;
    width: 77%;
    margin-top:10px;
    padding: 12px 5px;
    display: inline-block;
    border: 2px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box; 
    
`
const Button = styled.button`
    padding: 10px;
    color: #fff;
    background-color: #d54040;
    width: 77%;
    border-radius: 6px;
    box-sizing: border-box; 
    margin-top: 15px;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    &:hover{
      background-color: darkred;
      box-shadow: 5px 5px 5px #ccc;
    }
    
`






