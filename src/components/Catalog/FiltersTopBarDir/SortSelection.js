import React, {Component} from 'react'
import styled from 'styled-components'
import HideImgClosed from "../../../resources/image/Catalog/Categories/SpreadImgClosed.png"
import HideImgOpened from "../../../resources/image/Catalog/Categories/SpreadImgOpened.png"
import ArrowCheckImg from "../../../resources/image/Catalog/OptionsComponent/ArrowCheck.png"
import CatalogStore from "../../../stores/CatalogStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faDollarSign, faStar} from "@fortawesome/free-solid-svg-icons";

export default class SortSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            clickedSorts: [false, false, false]
        };

        this.sortOptionClicked = this.sortOptionClicked.bind(this);
    }

    sortOptionClicked(index){
        let copy = [...this.state.clickedSorts];
        copy[index] = !copy[index];
        this.setState({clickedSorts: copy});

        switch (index) {
            case 0 :
                CatalogStore.togglePrice(this.state.clickedSorts[0]);
                break;
            case 1 :
                CatalogStore.toggleRating(this.state.clickedSorts[1]);
                break;
            case 2 :
                CatalogStore.toggleNewest(this.state.clickedSorts[2]);
                break;
        }
    }

    render() {
        return (
            <Container>
                <OpenFiltersButton
                    onClick={() => {
                        this.setState({isOpen: !this.state.isOpen})
                    }}>
                    <span>СОРТИРОВАТЬ</span>
                    <SortOpenButton
                        src={this.state.isOpen ? HideImgOpened : HideImgClosed}
                    />
                </OpenFiltersButton>
                <SortOptionsContainer isOpen={this.state.isOpen}>
                    <SortOption onClick={() => {
                        this.sortOptionClicked(0);
                    }}>
                        <FontAwesomeIcon icon={faDollarSign}/>
                        <SortOptionTitle>
                            Цена
                        </SortOptionTitle>
                        <SortOptionState src={ArrowCheckImg} isSelected={this.state.clickedSorts[0]}/>
                    </SortOption>
                    <SortOption onClick={() => {
                        this.sortOptionClicked(1);
                    }}>
                        <FontAwesomeIcon icon={faStar}/>
                        <SortOptionTitle>
                            Популярность
                        </SortOptionTitle>
                        <SortOptionState src={ArrowCheckImg} isSelected={this.state.clickedSorts[1]}/>
                    </SortOption>
                    <SortOption onClick={() => {
                        this.sortOptionClicked(2);
                    }}>
                        <FontAwesomeIcon icon={faClock}/>
                        <SortOptionTitle>
                            Дата
                        </SortOptionTitle>
                        <SortOptionState src={ArrowCheckImg} isSelected={this.state.clickedSorts[2]}/>
                    </SortOption>
                </SortOptionsContainer>
            </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    z-index: 100;
    height: 30px;
    padding: 0 !important;
`;

const SortOpenButton = styled.img`
    width: 18px;
    height: 15px;
    cursor: pointer;
`;

const SortOptionsContainer = styled.ul`
    position: absolute;
    display: ${props => props.isOpen ? 'block;' : "none;"};
    font-size: 13px;
    list-style: none;
    padding: 5px;
    background-color: white;
    left: calc((100vw - 1020px) / 7);
    margin-top: 5px;
    z-index: 101;
    top: 162px;
    > :last-child{
        border: none;
    }
    
    
`;

const SortOption = styled.li`
    padding: 10px;
    margin: 2px;
    border-bottom: 1px solid #DADADA;
    cursor: pointer;
    
    > svg{
        float: left;
        width: 13px !important;
        height: 13px !important;
    }
`;

const SortOptionState = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 40px;
    float: right;
    ${props => props.isSelected ? 'transform: rotateX(180deg);' : ""}
`;

const SortOptionTitle = styled.span`
    font-size: 13px;
    margin-left: 5px;
`;

const OpenFiltersButton = styled.div`
    display: grid;
    grid-template-columns: min-content 25px;  
    align-items: center;
    padding: 0;
    align-self: center;
    grid-gap: 10px;
    span {
      font-size: 12px;
      cursor: pointer;
    }
`;