import React, {Component} from 'react'
import styled from 'styled-components'
import HideImgClosed from "../../../resources/image/OptionsComponent/HideImgClosed.png"
import ArrowCheckImg from "../../../resources/image/OptionsComponent/ArrowCheck.png"
import CatalogStore from "../../../stores/CatalogStore";

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
                <SortOpenButton
                    onClick={() => {
                        this.setState({isOpen: !this.state.isOpen})
                    }}
                    src={HideImgClosed}
                />
                <SortOptionsContainer isOpen={this.state.isOpen}>
                    <SortOption onClick={() => {
                        this.sortOptionClicked(0);
                    }}>
                        Price
                        <SortOptionState src={ArrowCheckImg} isSelected={this.state.clickedSorts[0]}/>
                    </SortOption>
                    <SortOption onClick={() => {
                        this.sortOptionClicked(1);
                    }}>
                        Rating
                        <SortOptionState src={ArrowCheckImg} isSelected={this.state.clickedSorts[1]}/>
                    </SortOption>
                    <SortOption onClick={() => {
                        this.sortOptionClicked(2);
                    }}>
                        Newest
                        <SortOptionState src={ArrowCheckImg} isSelected={this.state.clickedSorts[2]}/>
                    </SortOption>
                </SortOptionsContainer>
            </Container>
        )
    }
}

const Container = styled.div`
    display: inline-block;
    z-index: 100;
    height: 26px;
    padding: 0 20px;
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
    left: 10px;
    margin-top: 5px;
    
    > :last-child{
        border: none;
    }
`;

const SortOption = styled.li`
    padding: 10px;
    margin: 2px;
    border-bottom: 1px solid #DADADA;
    cursor: pointer;
`;

const SortOptionState = styled.img`
    width: 30px;
    height: 20px;
    margin-left: 40px;
    float: right;
    ${props => props.isSelected ? 'transform: rotateX(180deg);' : ""}
`;