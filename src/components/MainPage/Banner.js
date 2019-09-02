import React from 'react';
import styled from 'styled-components';
import banner from '../../resources/image/MainPage/banner.png'

export default class Banner extends React.Component {

render() {
    return(
        <BannerImg src={banner}/>
    )
    }
}

const BannerImg = styled.img`
    width: 90%;
    margin: 50px 5%;
    
`;