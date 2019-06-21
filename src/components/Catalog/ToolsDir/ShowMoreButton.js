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
                    Show more
                </ButtonTitle>
            </Container>
        )
    }
}

const Container = styled.div`
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    justify-self: center;
`;

const ButtonImg = styled.img`
    width: 15px;
    height: 15px;
`;

const ButtonTitle = styled.span`
    font-size: 15px;
    font-weight: bold;
    padding: 5px;
`;