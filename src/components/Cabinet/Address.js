import React from 'react';
import styled from 'styled-components';
import Footer from "../public/Footer"
import MainTopBar from "../public/MainTopBar";

export default class Address extends React.Component{
    render() {
        return (
            <div>
                <MainTopBar/>
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

                        </TitleColumn>
                        <TitleColumn>
                            <p> Add New Address </p>
                        </TitleColumn>
                        <TitleColumn>

                        </TitleColumn>
                        <Inp>

                        </Inp>
                        <Inp>
                            <label htmlFor=""> First Name</label><br/>
                            <Input type="text"/>
                        </Inp>
                        <Inp>
                            <label htmlFor=""> Phone</label><br/>
                            <Input type="text"/>
                        </Inp>
                        <Inp>

                        </Inp>
                        <Inp>
                            <label htmlFor=""> Last Name</label><br/>
                            <Input type="text"/>
                        </Inp>
                        <Inp>
                            <label htmlFor=""> City</label><br/>
                            <Input type="text"/>
                        </Inp>
                        <Inp>

                        </Inp>
                        <Inp>

                        </Inp>
                        <Inp>
                            <label htmlFor=""> Street</label><br/>
                            <Input type="text"/>
                        </Inp>
                        <Inp>

                        </Inp>
                        <Inp>

                        </Inp>
                        <InpOther>
                            <Dop>
                                <label htmlFor=""> Home</label><br/>
                                <Input type="text"/>
                            </Dop>
                            <Dop>
                                <label htmlFor=""> Ap.</label><br/>
                                <Input type="text"/>
                            </Dop>
                            <Dop>
                                <label htmlFor=""> Zip-code</label><br/>
                                <Input type="text"/>
                            </Dop>
                            <Button>Save</Button>

                        </InpOther>


                    </Form>
                </Main>
                <Footer/>
            </div>
        );
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
      margin: 0 80px;
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
    grid-template-rows: 50px 100px 100px 100px 150px ;
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

const InpOther = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 280px;
    justify-self: center;
    margin-left: 65px;
    
`

const  Dop = styled.div`
    
`
const Button = styled.button`
    grid-column-start: 1;
    grid-column-end: 6;
    width: 92%;
    padding: 10px;
    color: #fff;
    background-color: #d54040;
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


