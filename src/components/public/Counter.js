import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default class Counter extends React.Component {


    increaseCountOfProducts = (() => {
        this.setState(oldState => {
            if (oldState.countOfProducts === this.max){
                return {
                    disabledIncrement: true
                }
            }else if (oldState.countOfProducts < this.max) {
                this.props.setVal(1+oldState.countOfProducts);
                return {
                    countOfProducts: ++oldState.countOfProducts,
                    disableDecrement: false
                }
            } else {
                this.props.setVal(1+oldState.countOfProducts);
                return {
                    disabledIncrement: true,
                    disableDecrement: false,
                    countOfProducts: ++oldState.countOfProducts
                }
            }
        })
    }).bind(this);

    decreaseCountOfProducts = (() => {
        this.setState(oldState => {
            if (oldState.countOfProducts === 1) return {disableDecrement: true}
            if (oldState.countOfProducts > 2) {
                this.props.setVal(oldState.countOfProducts - 1);
                return {
                    disabledIncrement: false,
                    countOfProducts: --oldState.countOfProducts
                }
            } else {
                this.props.setVal(oldState.countOfProducts - 1);
                return {
                    countOfProducts: --oldState.countOfProducts,
                    disabledIncrement: false,
                    disableDecrement: true
                }
            }
        })
    }).bind(this);

    constructor(props){
        super(props);

        this.max = props.max || 999999999;
        if (props.max === 1)
            this.state = {
                countOfProducts: 1,
                disabledIncrement: true,
                disableDecrement: true
            }
        else this.state = {
            countOfProducts: props.defaultValue || 1,
            disabledIncrement: props.defaultValue? props.defaultValue >= this.max : false,
            disableDecrement: props.defaultValue? props.defaultValue <= 1 : true
        }
    }

render() {
    return(
        <CountBlock>
            <CountButton onClick={this.decreaseCountOfProducts} disabled={this.state.disableDecrement}>
                <FontAwesomeIcon icon={faMinus}/>
            </CountButton>
            <Count type="text"
                   disabled={true}
                   value={this.state.countOfProducts}
            />
            <CountButton onClick={this.increaseCountOfProducts} disabled={this.state.disabledIncrement}>
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
    &[disabled]{
        cursor: auto;
        svg{
            color: #666666;
        }
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