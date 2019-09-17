import React from 'react';
import styled from 'styled-components';
import {Swiper, Slide} from 'react-dynamic-swiper'
import 'react-dynamic-swiper/lib/styles.css';
import {getRecomened} from "../../api/Recomendations";
import {inject, observer} from "mobx-react";
import Query from "react-apollo/Query";
import gql from 'graphql-tag'
import {UrlStore} from "../../stores/UrlStore";
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";

@inject('store')
@observer
export default class Recomendations extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            data: [],
            ready: false
        }
    }

    componentWillMount() {
        getRecomened(this.props.store.userStore.isLogged).then(data => {
            let step = window.innerWidth < 1100?3:4;
            let buffer = [];
            let arr = data;
            while (arr.length > 0) {
                buffer.push(arr.slice(0,step));
                arr = arr.slice(step);
            }
            this.setState({
                data: buffer,
                ready: true
            })
        })
    }

    render() {
        if (!this.state.ready) return '';

        return(
            <React.Fragment>
                <Title>Самые популярные товары</Title>
                <Swiper
                    navigation={true}
                    pagination={false}
                >
                    {this.state.data.map(group =>
                        <Group key={group[0]}>
                            {group.map(elem =>
                                <Query query={
                                    gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            name_ru
                            vendor
                            photos{
                                url
                            }
                            price
                          }
                        }`
                                }
                                       key={elem}
                                       variables={{"id":elem}}>
                                    {({loading, error, data}) => {
                                        if (loading) return <p/>;
                                        if (error) {
                                            return '';
                                        }
                                        return <Block>
                                            <Image src={UrlStore.MAIN_URL + data.product.photos[0].url}/>
                                            <Name to={'/product/' + elem}>{data.product.name_ru}</Name>
                                            <Vendor>{data.product.vendor}</Vendor>
                                            <Price>{data.product.price} грн.</Price>
                                        </Block>
                                    }}
                                </Query>)}
                        </Group>

                    )}
                </Swiper>
            </React.Fragment>
            )
        }
}

const Title = styled.h2`
    text-align: center;
    
`;

const Block = styled.div`
    display: grid;
    grid-template-rows: 250px repeat(3, min-content);
    grid-gap: 5px;
    height: 400px;
    width: 300px;
    text-align: center;
`;

const Image = styled.img`
    object-fit: contain;
    max-height: 250px;
    justify-self: center;
`;

const Name = styled(Link)`
    font-size: 11pt;
    color: ${theme.primary};
    &:hover{
        color: ${theme.primary_light};
        text-decoration: underline;
    }
`;

const Vendor = styled.span`
    font-size: 10pt;
    color: #666666;
    margin-top: 5px;
    
`;

const Price = styled.span`
    
    
`;

const Group = styled(Slide)`
    display: grid !important;
    grid-gap: 20px !important;
    justify-content: center !important;
    @media(min-width: 1100px){
        grid-template-columns: repeat(4,300px) !important;
    }    
    @media(max-width: 1100px){
        grid-template-columns: repeat(3,300px) !important;
    }    
    
`;



//                             return(
//                                 <React.Fragment>
//                                     <MetaTags>
//                                         <title>{data.product.name_ru}</title>
//                                         <meta name='title' content={data.product.meta_title}/>
//                                         <meta name='keywords' content={data.product.meta_keywords}/>
//                                         <meta name='decription' content={data.product.meta_decription}/>
//                                     </MetaTags>
//                                     <ProductName>{data.product.name_ru}</ProductName>
//                                     <Vendor>{data.product.vendor}</Vendor>
//                                 </React.Fragment>
//
//                             );
//                         }}
//                     </Query>