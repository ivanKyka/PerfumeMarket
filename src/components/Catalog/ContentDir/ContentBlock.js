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
import ReactNotification, { store } from 'react-notifications-component';
import Notification from "../../public/Notification";

@inject('store')
export default class ContentBlock extends React.Component{

    constructor(props) {
        super(props);
        this.product = Object.assign({},props.options);
        this.product.price = this.product.discount_price > 0 ? this.product.discount_price : this.product.price;
    }

    addToCart = e => {
        e.preventDefault();
        this.props.store.cart.addToCart(this.props.options, 1);
        store.addNotification(Notification('Товар добавлен в корзину'));
    };

    addToWishList = e => {
        e.preventDefault();
        AddToWishList(this.props.options.id);
        store.addNotification(Notification('Товар добавлен в избранное'));
    };

    render() {
        if (this.props.options.discount_price > 0) {
            console.log(this.props.options.price);
            console.log(this.props.options.discount_price);
        }
        return(
           <ThemeProvider theme={theme}>
               <GloblalLink href={`/product/${this.props.options.id}`}>
               <Block>
                   <Image src={this.props.options.image}/>
                   <Head>
                       <Grade>
                           <StarRatings
                               rating={this.props.options.rating>0?this.props.options.rating:4}
                               starRatedColor={"black"}
                               starEmptyColor={'gray'}
                               numberOfStars={5}
                               name='rating'
                               starDimension={'14px'}
                               starSpacing={'1px'}
                           />
                       </Grade>
                       <span>Отзывы: {this.props.options.reviews}</span>
                   </Head>
                   <Describe>
                       <Name>{this.props.options.name}</Name>
                       <span>{this.props.options.vendor}</span>
                       {this.props.options.discount_price > 0?<PriceBlock>
                           <OldPrice>{this.props.options.price}</OldPrice>
                           <NewPrice>{this.props.options.discount_price} грн.</NewPrice>
                       </PriceBlock>:<Price>{this.props.options.price} грн.</Price>}

                   </Describe>
                   {this.props.options.avaliable?
                       <Button
                           onClick={e => {
                               e.preventDefault();
                               this.props.openCheckout([{product:this.product, count:1}])
                           }}
                       >Купить</Button>:
                   <Button disabled={true}>Нет в наличии</Button>}
                   <Bottom>
                       {this.props.options.gift_status?<FontAwesomeIcon icon={faGift} size={'2x'}/>:<span/> }
                       {this.props.options.avaliable?<FontAwesomeIcon
                           icon={faCartPlus}
                           size={'2x'}
                           onClick={this.addToCart}
                       />:<FontAwesomeIcon
                           icon={faCartPlus}
                           size={'2x'}
                           style={{color: '#666'}}
                           onClick={e => e.stopPropagation()}
                       />}

                       <FontAwesomeIcon
                           icon={faHeart}
                           size={'2x'}
                           onClick={this.addToWishList}
                       />
                   </Bottom>
                   <ReactNotification/>
               </Block>
               </GloblalLink>
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
    grid-template-rows: 250px 30px min-content 50px 40px;
    z-index: 6;
    box-shadow: 0 0  10px  ${props => props.theme.primary} ;
    animation: ${BlockHover} .2s ease-out forwards;
    
    img{
        max-height: 250px;
        max-width: 250px;
    }
    // p {
    //     color: ${props => props.theme.primary_light};
    // }
  }
`;

const Image = styled.img`
  justify-self: center;
  align-self: center;
  max-height: 220px;
  max-width: 220px;
  z-index: 5;
  object-fit: cover;
`;


const Link = styled.a`
    font-size: 10pt;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    color: #000000;
    &:hover{
      text-decoration: underline;
      color: ${props => props.theme.primary};
    }
`;

const Describe = styled.div`
  width: 250px; 
  max-height: 190px;
  text-align: center;
  justify-self: center;
  font-size: 11pt;
  span {
    color: #777;
    font-size: 9pt;
    font-weight: normal;
  }
`;

const Grade = styled.div`
  justify-self: center;
  display: inline;
 
`;

const Head = styled.div`
  justify-self: center;
  
  span{
    margin-left: 70px;
    color: #777;
    font-size: 10pt;
    cursor: pointer;
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
  outline: none;
  &:hover {
    background: ${props => props.theme.primary_light};
  }
  &[disabled]{
      width: 170px;
      background: #cccccc;
      border: #cccccc solid 1px;
      &:hover{
        background: #cccccc;
      }
  }
`;

const Price = styled.p`
  color: #555;
  font-size: 12pt;
  font-weight: bold;
  align-self: center;
  justify-self: center;
  margin: 5px 0 0 0;
  padding: 0;
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

const GloblalLink = styled(Link)`
    text-decoration: none !important;
    z-index: 5;
    
    &:hover{
       z-index: 6;
    }
    
`;

const Name = styled.p`
    font-size: 11pt;
    color: ${theme.bgCol};
    font-weight: bold;
    margin: 0;
    padding: 0;
    
`;

const PriceBlock = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 2fr;  
    grid-gap: 25px;
    height: 25px;
`;

const OldPrice = styled(Price)`
    font-size: 11pt;
    color: #9c0d00;
    text-decoration: line-through;
    float: right;
    margin: 0;
    padding: 0;
    display: block;
    justify-self: right;
`;
const NewPrice = styled(Price)`
    margin: 0;
    padding: 0;
    justify-self: left;
`;