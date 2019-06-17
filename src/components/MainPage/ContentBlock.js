import React from 'react'
import {keyframes} from "styled-components";
import {ThemeProvider} from 'styled-components';
import styled from "styled-components";
import StarRatings from 'react-star-ratings'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGift, faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {faHotjar} from "@fortawesome/free-brands-svg-icons/faHotjar";
import {theme} from "../../stores/StyleStore";


export default class ContentBlock extends React.Component{

    render() {
       return(
           <ThemeProvider theme={theme}>
               <Block>
                   <Image src={this.props.options.image}/>
                   <Head>
                       <Grade>
                           <StarRatings
                               rating={this.props.options.rating}
                               starRatedColor={"black"}
                               starEmptyColor={'gray'}
                               numberOfStars={5}
                               name='rating'
                               starDimension={'14px'}
                               starSpacing={'1px'}
                           />
                       </Grade>
                       <a>Отзывы: {this.props.options.reviews}</a>
                   </Head>
                   <Describe>
                       <Link href={`/product/${this.props.options.id}`}>{this.props.options.name}</Link>
                       <br/>
                       <span>{this.props.options.vendor}</span>
                   </Describe>
                   <Button>Купить</Button>
                   <Price>{this.props.options.price} грн.</Price>
                   <Bottom>
                       <FontAwesomeIcon icon={faGift} size={'2x'}/>
                       <FontAwesomeIcon icon={faCartPlus} size={'2x'}/>
                       <FontAwesomeIcon icon={faHotjar} size={'2x'}/>
                   </Bottom>
               </Block>
           </ThemeProvider>
       )
    }
}

const BlockHover = keyframes`
  0% { 
    width: 280px;
    height: 380px; 
  }
  100%  { 
    width: 300px;
    height: 580px; 
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
  padding-top: 5px;
  width: 250px;
  height: 380px;
  z-index: 5;
  background: #fff;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px 30px 120px;
  border-radius: 5px;
  justify-self: center;
  justify-items: center;  
  &:hover {
    grid-template-rows: 250px 30px 130px 50px 30px 70px;
    z-index: 6;
    box-shadow: 0 0  10px  ${props => props.theme.primary} ;
    animation: ${BlockHover} .2s ease-out forwards;
  }
`;

const Image = styled.img`
  justify-self: center;
  align-self: center;
  max-width: 250px;
  //margin: 30px 10%;
  height: 250px;
`;


const Link = styled.a`
    font-size: 12pt;
    text-decoration: none;
    cursor: pointer;
    color: ${props => props.theme.primary};
    &:hover{
      text-decoration: underline;
      color: ${props => props.theme.primary};
    }
`;

const Describe = styled.div`
  width: 250px; 
  text-align: center;
  justify-self: center;
  span {
    color: #777;
    font-size: 9pt;
  }
`;

const Grade = styled.div`
  justify-self: center;
  display: inline;
`;

const Head = styled.div`
  justify-self: center;
  
  a{
    margin-left: 70px;
    color: #777;
    font-size: 10pt;
    cursor: pointer;
    &:hover{
    text-decoration: underline;
    color: #000;
    }
  }
`;

const Button = styled.button`
  height: 40px;
  width: 100px;
  background: ${props => props.theme.primary};
  color: white;
  font-size: 12pt;
  justify-self: center;
  align-self: center;
  cursor: pointer;
  border: ${props => props.theme.primary} solid 1px;
  &:hover {
    background: ${props => props.theme.primary_light};
  }
`;

const Price = styled.p`
  color: #555;
  font-size: 12pt;
  font-weight: bold;
  align-self: center;
  justify-self: center;
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  grid-template-rows: 70px;
  justify-items: center;
  align-items: center;
  color: ${props => props.theme.primary};
  
  svg{
    cursor: pointer;
  }
`;