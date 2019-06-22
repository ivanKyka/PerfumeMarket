import React, {Component} from 'react'
import styled from "styled-components"
import ScrollImg from '../../../resources/image/ToolsBar/ScrollUpImg.png'

export default class ScrollToTopButton extends Component{
    constructor(props){
        super(props);

        this.state = {
            intervalID: null,
            intervalInMs: props.IntervalInMs ? props.IntervalInMs : 2,
            step: props.Step ? props.Step : 10
        };

        this.scrollStep = this.scrollStep.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    scrollStep(){
        if (window.pageYOffset === 0){
            clearInterval(this.state.intervalID);
        }

        window.scroll(0, window.pageYOffset - this.state.step);
    }

    scrollToTop(){
        this.setState({intervalID: setInterval(this.scrollStep, this.state.intervalInMs)});
    }

    render(){
        return(
            <Container>
                <Button onClick={
                    () => this.scrollToTop()
                }
                src={ScrollImg}
                />
            </Container>
        )
    }
}

const Container = styled.div`
    display: inline-block;
    float: right;
    cursor: pointer;
    padding: 10px;
`;

const Button = styled.img`
    width: 20px;
    height: 20px;
`;