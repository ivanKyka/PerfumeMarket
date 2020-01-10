import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {GetWishList, AddToWishList,ClearWishList,RemoveFromWishList} from "../../api/WishList";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Categories from '../Product/Categories';
import {theme} from "../../stores/StyleStore";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {inject} from "mobx-react";
import StarRatings from "react-star-ratings";
import MetaTags from "react-meta-tags";
import {me} from "../../api/Users";
import ReactNotification, {store} from "react-notifications-component";
import Notification from "../public/Notification";
import ReactGA from "react-ga";

@inject('store')
export default class WishList extends React.Component{

    removeFromWishList = (id => {
        RemoveFromWishList(id).then(data => {
            this.setState({
                dataList: data
            });
        });
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            dataList: [],
            ready: false
        }
    }
    
    componentWillMount() {
        ReactGA.pageview(location.pathname);
        GetWishList().then(data => {
            this.setState({
                dataList: data,
                ready: true
            })
        })
    }

    render() {
        if (this.state.ready)
        return(
            <React.Fragment>
                <MetaTags>
                    <title>Пожелания</title>
                </MetaTags>
                <ThemeProvider theme={theme}>
                    {this.state.dataList.length === 0?
                        <EmptyBlock>
                            <h2>Хмм... Как-то здесь пусто :(</h2>
                            <p>Но может <ToMain to={'/'}>добавим что-нибудь</ToMain>?</p>
                        </EmptyBlock>:
                        <Container>
                            {this.state.dataList.map(el =>
                                <Query
                                    key={el}
                                    query={
                                        gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            photos{
                              url
                            }
                            name_ru
                            avaliable
                            rating
                            price
                            vendor
                          }
                        }`
                                    }
                                    variables={{"id": el}}>
                                    {({loading, error, data}) => {
                                        if (loading) return <p></p>;
                                        if (error) {
                                            return <p>Error :(</p>;
                                        }
                                        const images = data.product.photos.map(a => a.url).reverse();
                                        return(
                                            <ProductCard>
                                                <Image src={this.props.store.urlStore.MAIN_URL + images[0]}/>
                                                <InfoBlock>
                                                    <Categories ProductID={el}/>
                                                    <Name
                                                        to={'/product/' + el}
                                                    >{data.product.name_ru}</Name>
                                                    <StarRatings
                                                        rating={data.product.rating > 0? data.product.rating : 4}
                                                        starRatedColor={"black"}
                                                        starEmptyColor={'gray'}
                                                        numberOfStars={5}
                                                        name='rating'
                                                        starDimension={'16px'}
                                                        starSpacing={'1px'}
                                                    />
                                                    <Vendor>{data.product.vendor}</Vendor>
                                                    <Price>{data.product.avaliable?data.product.price + ' грн':'Нет в наличии'}</Price>
                                                </InfoBlock>
                                                <div>
                                                    <CloseButton onClick={e =>{
                                                        e.preventDefault();
                                                        this.removeFromWishList(el);
                                                    }}>
                                                        <FontAwesomeIcon icon={faTimes} size={'lg'}/>
                                                    </CloseButton>
                                                    {data.product.avaliable && <CartButton
                                                        icon={faCartPlus}
                                                        size={'lg'}
                                                        onClick={() => {
                                                            let product = {
                                                                id: el,
                                                                price: data.product.price,
                                                                avaliable: data.product.avaliable
                                                            }
                                                            this.props.store.cart.addToCart(product, 1);
                                                            store.addNotification(Notification('Товар добавлен в корзину'));
                                                        }}
                                                    />}
                                                </div>
                                            </ProductCard>
                                        );
                                    }}
                                </Query>
                            )}
                        </Container>}
                </ThemeProvider>
                <ReactNotification/>
            </React.Fragment>
        )
        else return ''
    }
}

const Container = styled.div`
    display: grid;
    justify-items: center;
`;

const ProductCard = styled.div`
    display: grid;
    grid-template-columns: 200px 500px 30px;
    padding: 10px;
    height: 200px;
    max-width: 800px;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    
`;

const InfoBlock = styled.div`
    display: grid;
    grid-template-rows: min-content min-content 25px 25px 30px;
    padding: 20px;
`;

const Name = styled(Link)`
    font-size: 14px;
    color: ${props => props.theme.primary};
    padding-top: 5px;
    
    &:hover {
      color: ${props => props.theme.primary_light};
      text-decoration: underline;
    }    
`;
const Vendor = styled.span`
    font-size: 16px;
    color: #4A4A4A;
    margin-bottom: 10px;

`;
const Price = styled.span`
    font-size: 24px;
    color: #575757;
    font-weight: bold;
    margin-bottom: 10px;
`;


const CloseButton = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50px;
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    transition: .2s ease-out;
    &:hover{
      background: rgba(50, 50, 50, 0.5);
      color: #222;
    }
`;

const EmptyBlock = styled.div`
    margin: 0 auto;
    width: 100%;
    height: 250px;
    text-align: center; 
    padding-top: 40px;
    
    h2{
      font-size: 24pt;
    }
    p{
      font-size: 18pt;
    }
`;

const ToMain = styled(Link)`
    cursor: pointer;
    font-size: 18pt;
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.primary}
    } 
`;

const CartButton = styled(FontAwesomeIcon)`
    color: ${props => props.theme.primary};
    cursor: pointer;
    margin-top: 10px;
    &:hover{
        color: ${props => props.theme.primary_light};
    }
    
`;