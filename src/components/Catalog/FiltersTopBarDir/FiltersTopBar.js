import React, {Component} from 'react'
import styled from 'styled-components'

export default class FiltersTopBar extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <Container>
                <li>
                    <Label>SORT BY</Label>
                </li>
                <li>
                    <Label>KEYWORDS</Label>
                    <Input width={`80px`} placeholder={"Men"}/>
                </li>
                <li>
                    <Label>PRICE</Label>
                    <Input width={`40px`} placeholder={"10"}/>
                    <Input width={`40px`} placeholder={"1000"}/>
                </li>
                <li>
                    <ApplyButton>
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