import React, {Component} from 'react'
import styled from 'styled-components'
import ShowMoreImg from '../../../resources/image/ToolsBar/ShowMoreImg.png'
import CatalogStore from "../../../stores/CatalogStore";

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
                    Показать ещё
                </ButtonTitle>
            </Container>
        )
    }
}

const Container = styled.div`
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    margin-left: 50%;
    transform: translateX(-50%);
`;

const ButtonImg = styled.img`
    width: 15px;
    height: 15px;
`;

const ButtonTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
`;