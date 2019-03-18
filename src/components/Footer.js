import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
export default class Footer extends React.Component{
    render() {
        return(
            <Container>


                    <Foot1>
                        <span>Portland</span>

                    </Foot1>

                    <Foot2>
                        <Menu>
                            <ListPoint><a href="">HOME</a></ListPoint>
                            <ListPoint><a href="">SHOP</a></ListPoint>
                            <ListPoint><a href="">TEAM</a></ListPoint>
                            <ListPoint><a href="">ABOUT US</a></ListPoint>
                            <ListPoint><a href="">CONTACTS</a></ListPoint>
                        </Menu>

                    </Foot2>
                    <Foot3>
                        <FontAwesomeIcon icon={faTwitter} size={'2x'}/>
                    </Foot3>
                    <FootLine>
                        <Line/>
                    </FootLine>


                    <Foot4>
                        <span>She gave my mother such a turn, that I have always been convinced I am indebted to Miss <br/>Betsey for having been born on a Friday.</span>

                    </Foot4>
                    <Foot5>
                        <TextRightBottom><F1 href="" >PRIVACY POLICY</F1></TextRightBottom>
                        <TextRightBottom><F2 href="" >TERMS AND CONDITIONS</F2></TextRightBottom>
                    </Foot5>



            </Container>
        )
    }
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 149px 1px 149px;
  height: 300px;
  background-color: #222328;
  padding: 0;
  margin: 0;
 
`;

const Link = styled.a`
    text-decoration: none;
    color: white;
`;


const Foot1 = styled.div`
  color: #ffffff;
  padding-left: 100px;
  align-self: center;
`;
const Foot2 = styled.div`
  align-self: center;
  grid-column: 2/4;
`;
const Menu = styled.ul`
  list-style: none;
  text-align: center;
`;
const ListPoint = styled.li`
  display: inline-block;
  color: #ffffff;
  font-size: 12pt;
  padding-left: 20px;
  a{
    text-decoration: none;
    color: white;
  }
`;

const Foot3 = styled.div`

`;
const FootLine = styled.div`
 grid-column-start: 1;
 grid-column-end: 5;
`;
const Line = styled.hr`
 border: 0;
 height: 2px;
 background: rgba(50, 51, 53,0.3);
 margin: 0 100px 0 100px;
`;
const Foot4 = styled.div`
 grid-column: 1/3;
 color: rgba(111, 110, 119, 0.3);
 font-size: 14pt;
 padding-left: 100px;
 align-self: center;
 font-family: 'Dancing Script', cursive;
//https://fonts.googleapis.com/css?family=Dancing+Script
 
`;
const Foot5 = styled.div`
grid-column-start: 3;
grid-column-end: 5;
align-self: center;
justify-self: end;
padding-right: 100px;
`;
const TextRightBottom = styled.span`

`;
const F1 = styled.a`
color: rgba(111, 110, 119, 0.3);
text-decoration: none;
font-size: 11pt;
padding-right: 40px;
`;
const F2 = styled.a`
color: rgba(111, 110, 119, 0.3);
text-decoration: none;
font-size: 11pt;

`;


