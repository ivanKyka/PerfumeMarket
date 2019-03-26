import React from 'react'
import Image5 from "../../resources/image/Content/5.jpg";
import {keyframes} from "styled-components";
import styled from "styled-components";


export default class ContentBlock extends React.Component{

    render() {
       return(
           <Block>
               <Image src={Image5} alt=""/>
               <BlockInfo>
                   <Link href={''}>Lorem ipsum.</Link>
               </BlockInfo>
               <HiddenInfo>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis doloribus dolorum error eveniet, ex explicabo, facilis id incidunt ipsum, magni maiores nam necessitatibus neque nulla optio porro quasi quis quisquam repellat sapiente sit voluptate voluptates? Atque autem consectetur corporis cumque dicta dignissimos dolor, incidunt laboriosam qui sequi totam voluptatem.</HiddenInfo>
           </Block>
       )
    }
}

const BlockHover = keyframes`
  0% { 
    height: 400px; 
  }
  100%  { 
    height: 550px; 
  }
`;

const ShowText = keyframes`
  0% { 
    height: 0;
  }
  100%  { 
    height: 150px; 
  }
`;

const Block = styled.div`
  height: 400px;
  z-index: 5;
  border: 1px solid #bbb;
  background: #fff;
  overflow: hidden;

  & > div:last-child {
      display: none;
    }
    
  &:hover {
    border: 1px solid #666;
    z-index: 6;
    box-shadow: 4px 4px  5px rgba(75,75,75, 0.5);
    animation: ${BlockHover} .2s ease-out forwards;
    & > div:last-child {
    display: block;
    animation: ${ShowText} .4s ease-in forwards;
    }
  }
`;

const Image = styled.img`
  width: 80%;
  margin: 10% 10% 0 10%;
  height: 250px;
`;

const BlockInfo = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const Link = styled.a`
    font-size: 14px;
    text-decoration: none;
    margin: 5px 20px;
    &:hover{
    text-decoration: underline;
    }
`;

const HiddenInfo = styled.div`
  margin: 5px 20px;
`;