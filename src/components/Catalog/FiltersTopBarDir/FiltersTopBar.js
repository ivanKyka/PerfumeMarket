import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components';
import CatalogStore from "../../../stores/CatalogStore";
import SortSelection from "./SortSelection";
import {theme} from '../../../stores/StyleStore';

export default class FiltersTopBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            keyWordsRef: React.createRef(),
            lowerPriceRef: React.createRef(),
            higherPriceRef: React.createRef(),
            keyWords: props.searchMode ? this.props.searchRequest : "",
            lowerPrice: "",
            higherPrice: ""
        };

        this.onKeyWordsChange = this.onKeyWordsChange.bind(this);
        this.onLowerPriceChange = this.onLowerPriceChange.bind(this);
        this.onHigherPriceChange = this.onHigherPriceChange.bind(this);
        this.resetChanges = this.resetChanges.bind(this);
    }

    onKeyWordsChange(){
        this.setState({keyWords: this.state.keyWordsRef.current.value});
    }

    onLowerPriceChange(){
        this.setState({lowerPrice: this.state.lowerPriceRef.current.value});
    }

    onHigherPriceChange(){
        this.setState({higherPrice: this.state.higherPriceRef.current.value});
    }

    resetChanges(){
        if (this.state.keyWords === "" && this.state.lowerPrice === "" && this.state.higherPrice === ""){
            return;
        }

        this.setState({
            keyWords: "",
            lowerPrice: "",
            higherPrice: ""
        });

        CatalogStore.clearFiltersFormTopBar();
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <Container>
                <Menu>
                    <SortSelection/>
                    <div>
                        <Label>НАЗВАНИЕ</Label>
                        <Input ref={this.state.keyWordsRef} value={this.state.keyWords} onChange={this.onKeyWordsChange} width={`150px`} placeholder={"Поиск"}/>
                    </div>
                    <div>
                        <Label>ЦЕНА</Label>
                        <Input ref={this.state.lowerPriceRef} value={this.state.lowerPrice} onChange={this.onLowerPriceChange} width={`70px`} placeholder={"ОТ"}/>
                        <Input ref={this.state.higherPriceRef} value={this.state.higherPrice} onChange={this.onHigherPriceChange} width={`70px`} placeholder={"ДО"}/>
                    </div>
                    <ButtonsBlock>
                        <ApplyButton onClick={() => {
                            CatalogStore.setFiltersFromTopBar({
                                name_ru_contains : this.state.keyWords === "" ? null : this.state.keyWords,
                                price_lte : this.state.higherPrice === "" ? null : this.state.higherPrice,
                                price_gte: this.state.lowerPrice === "" ? null : this.state.lowerPrice
                            })
                        }}>
                            ПОИСК
                        </ApplyButton>
                        <ResetButton onClick={this.resetChanges}>
                            ОЧИСТИТЬ ВСЕ
                        </ResetButton>
                    </ButtonsBlock>
                </Menu>
            </Container>
        </ThemeProvider>
        );
    }
}

const Container = styled.div`
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
`;

const Menu = styled.div`
    display: grid;
    grid-template-columns: 150px 300px 250px 300px;
    justify-content: space-around;
    padding: 10px;
    z-index: 100;
    
    &>div{
        padding: 0 20px;
        margin: 0;
    }    
`;

const Label = styled.span`
    font-size: 12px;
`;

const Input = styled.input`
    width: ${props => props.width};
    margin-left: 15px;
    background-color: #fff;
    border: 1px solid ${props => props.theme.bgDarkCol};
    padding: 5px 10px;
    font-size: 12px;
    color: black;
    
    &:focus{
        outline: none;
        border: 1px solid ${props => props.theme.primary_light};
    }
    
    
`;

const Button = styled.button`
    font-size: 13px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 15px;
    
    &:focus{
        outline: none;
    }
`;

const ApplyButton = styled(Button)`
    border: 1px solid ${props => props.theme.primary};
    color:  white;
    display: block;
    background-color: ${props => props.theme.primary};
    
    &:hover{
        border: 1px solid ${props => props.theme.primary_light};
        background-color: ${props => props.theme.primary_light};
    }
`;

const ResetButton = styled(Button)`
    display: block;
    background-color: white;
    color: ${props => props.theme.bgDarkCol};
    border: 1px solid ${props => props.theme.bgDarkCol};
    
    &:hover{
        color: white;        
        background-color: ${props => props.theme.primary_light};
        border: 1px solid ${props => props.theme.primary_light};
    }
`;

const ButtonsBlock = styled.div`
    display: grid;
    grid-template-columns: 100px 150px;
`;