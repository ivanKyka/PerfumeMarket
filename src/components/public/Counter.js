import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default class Counter extends React.Component {


    increaseCountOfProducts = (() => {
        this.setState(oldState => {
            this.props.setVal(1+oldState.countOfProducts);
            return {
                countOfProducts: ++oldState.countOfProducts
            }
        })
    }).bind(this);
    decreaseCountOfProducts = (() => {
        this.setState(oldState => {
            if (oldState.countOfProducts > 1) {
                this.props.setVal(oldState.countOfProducts - 1);
                return {
                    countOfProducts: --oldState.countOfProducts
                }
            }
            return {
                countOfProducts: 1
            }
        })
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            countOfProducts: props.defaultValue || 1
        }
    }

render() {
    return(
        <CountBlock>
            <CountButton onClick={this.decreaseCountOfProducts}>
                <FontAwesomeIcon icon={faMinus}/>
            </CountButton>
            <Count type="text"
                   disabled={true}
                   value={this.state.countOfProducts}
            />
            <CountButton onClick={this.increaseCountOfProducts}>
                <FontAwesomeIcon icon={faPlus}/>
            </CountButton>
        </CountBlock>
    )
    }
}

const CountBlock = styled.div`
    max-width: 100px;
    max-height: 58px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-column: 1/2;
`;

const CountButton = styled.button`
    border: 1px solid #ccc;
    border-radius: 1px;
    background: #ffffff;
    cursor: pointer;
    svg{
      color: black;
    }
    
    &:active{
      outline: none;
    }
`;

const Count = styled.input`
    width: 50px;
    background: #EEEEEE;
    color: black;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 13pt;
`;