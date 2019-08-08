import React, {Component} from 'react'
import styled from 'styled-components'
import ShowMoreImg from '../../../resources/image/ToolsBar/ShowMoreImg.png'
import CatalogStore from "../../../stores/CatalogStore";
import {observer} from "mobx-react";

@observer
export default class ShowMoreButton extends Component {
    render() {
        return (
            <Container onClick={
                () => {
                    CatalogStore.increaseLimit();
                }
            }
            >
                <ButtonImg src={ShowMoreImg}/>
                <ButtonTitle>
                    {/*{ >= CatalogStore.limit ? CatalogStore.limit : CatalogStore.productsCount - toJS(CatalogStore.startFrom)}*/}
                </ButtonTitle>
            </Container>
        )
    }
}

const Container = styled.div`
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    margin-top: 50%;      
`;

const ButtonImg = styled.img`
    width: 100px;
    height: 100px;
`;

const ButtonTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
`;