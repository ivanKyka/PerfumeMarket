import React, {Component} from 'react'
import styled from 'styled-components'
import HideImgClosed from '../../../../resources/image/Catalog/OptionsComponent/HideImgClosed.png'
import Skeleton from "react-loading-skeleton";

export default class EmptyOptionsBlock extends Component {
    render() {
        return (
            <Block>
                <TitleContainer>
                    <Skeleton height={15} width={200} duration={1}/>
                    <HideButton src={HideImgClosed}/>
                </TitleContainer>
            </Block>
        )
    }
}

const Block = styled.div`
    margin-top: 10px;
    height: 39px;
    border-bottom: 1px solid #DADADA;
`;

const TitleContainer = styled.div`
    padding: 10px;
`;

const Title = styled.div`
    display: inline-block;
    height: 15px;
    width: 200px;
    background-color: #7d7d7d;
`;

const HideButton = styled.img`
    float: right;
    width: 18px;
    height: 15px;
    cursor: pointer;
`;