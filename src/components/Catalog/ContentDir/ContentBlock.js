import React from 'react'
import {keyframes} from "styled-components";
import {ThemeProvider} from 'styled-components';
import styled from "styled-components";
import StarRatings from 'react-star-ratings'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faGift, faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {theme} from "../../../stores/StyleStore";
import {inject} from "mobx-react";
import {AddToWishList} from "../../../api/WishList";

@inject('store')
export default class ContentBlock extends React.Component{

    addToCart = e => {
        e.preventDefault();
        this.props.store.cart.addToCart(this.props.options, 1);
    };

    addToWishList = e => {
        e.preventDefault();
        AddToWishList(this.props.options.id);
    };

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
                   <Button
                    onClick={e => {
                        e.preventDefault();
                        this.props.openCheckout([{product:this.props.options, count:1}])
                    }}
                   >Купить</Button>
                   <Price>{this.props.options.price} грн.</Price>
                   <Bottom>
                       <FontAwesomeIcon icon={faGift} size={'2x'}/>
                       <FontAwesomeIcon
                           icon={faCartPlus}
                           size={'2x'}
                           onClick={this.addToCart}
                       />
                       <FontAwesomeIcon
                           icon={faHeart}
                           size={'2x'}
                           onClick={this.addToWishList}
                       />
                   </Bottom>
               </Block>
           </ThemeProvider>
       )
    }
}

const BlockHover = keyframes`
  0% { 
    height: 400px; 
    width: 250px;
  }
  100%  { 
    height: 520px; 
    width: 280px;
  }
`;


const Block = styled.div`
  height: 400px;
  padding-top: 5px;
  width: 250px;
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
    width: 260px;
    grid-template-rows: 250px 30px min-content 50px 30px 70px;
    z-index: 6;
    box-shadow: 0 0  10px  ${props => props.theme.primary} ;
    animation: ${BlockHover} .2s ease-out forwards;
   
  }
`;

const Image = styled.img`
  justify-self: center;
  align-self: center;
  max-height: 220px;
  max-width: 220px;
  z-index: 5;
  object-fit: cover;
  :hover{
    max-height: 250px;
    max-width: 250px;
  }
`;


const Link = styled.a`
    font-size: 10pt;
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
  font-size: 11pt;
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
    
    &:active {
      color: black;
    }
  }
`;