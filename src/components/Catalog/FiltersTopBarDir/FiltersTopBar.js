import React, {Component} from 'react'
import styled from 'styled-components'
import CatalogStore from "../../../stores/CatalogStore";

export default class FiltersTopBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            keyWordsRef: React.createRef(),
            lowerPriceRef: React.createRef(),
            higherPriceRef: React.createRef(),
            keyWords: "",
            lowerPrice: "",
            higherPrice: ""
        };

        this.onKeyWordsChange = this.onKeyWordsChange.bind(this);
        this.onLowerPriceChange = this.onLowerPriceChange.bind(this);
        this.onHigherPriceChange = this.onHigherPriceChange.bind(this);
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

    render() {
        return (
            <Container>
                <li>
                    <Label>SORT BY</Label>
                </li>
                <li>
                    <Label>KEYWORDS</Label>
                    <Input ref={this.state.keyWordsRef} value={this.state.keyWords} onChange={this.onKeyWordsChange} width={`150px`} placeholder={"Men,Туалетная вода"}/>
                </li>
                <li>
                    <Label>PRICE</Label>
                    <Input type={'number'} min={0} ref={this.state.lowerPriceRef} value={this.state.lowerPrice} onChange={this.onLowerPriceChange} width={`70px`} placeholder={"10"}/>
                    <Input type={'number'} min={0} ref={this.state.higherPriceRef} value={this.state.higherPrice} onChange={this.onHigherPriceChange} width={`70px`} placeholder={"1000"}/>
                </li>
                <li>
                    <ApplyButton onClick={() => {
                        console.log(this.state.keyWords);
                        CatalogStore.setFiltersFromTopBar({
                            _q : this.state.keyWords === "" ? null : this.state.keyWords,
                            price_lte : this.state.higherPrice === "" ? null : this.state.higherPrice,
                            price_gte: this.state.lowerPrice === "" ? null : this.state.lowerPrice
                        })
                    }}>
                        Apply Changes
                    </ApplyButton>
                </li>
            </Container>
        );
    }
}

const Container = styled.ul`
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
    margin-left: 60px;
    padding: 0;
    
    list-style: none;
    
    > *{
        display: inline-block;
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
    background-color: #F0F2F7;
    border-radius: 10px;
    border: 1px solid #d8dadf;
    padding: 5px;
    font-size: 12px;
    
    :focus{
        outline: none;
    }
`;

const ApplyButton = styled.button`
    font-size: 13px;
    padding: 5px;
    background-color: #F0F2F7;
    border-radius: 10px;
    border: 1px solid #d8dadf;
    
    :hover{
        cursor: pointer;
        background-color: #e7e9ee;
    }
    
    :focus{
        outline: none;
    }
`;