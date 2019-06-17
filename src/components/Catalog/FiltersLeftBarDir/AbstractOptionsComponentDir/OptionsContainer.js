import React, {Component} from 'react'
import styled from 'styled-components'
import OptionsContent from "./OptionsContent";

export default class OptionsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsTitle: props.optionsTitle,
            linkTitle: props.linkTitle, // if present || null
            contentType: props.contentType, //    selection || radio
            content: props.content,
        }
    }

    render(){
        return(
            <Container>
                <OptionsTitleContainer>
                    <OptionsTitle>
                        {this.state.optionsTitle}
                    </OptionsTitle>
                    <OptionsLink>
                        {this.state.linkTitle ? this.state.linkTitle : ''}
                    </OptionsLink>
                </OptionsTitleContainer>
                <OptionsContent
                    contentType = {this.state.contentType}
                    content = {this.state.content}
                />
            </Container>
        )
    }
}

const Container = styled.div`
    width: 280px;
    margin-top: 50px;
`;

const OptionsTitleContainer = styled.div`
    border-bottom: 1px solid #DADADA;
    padding: 20px;
`;

const OptionsTitle = styled.span`
    font-size: 13px;
`;

const OptionsLink = styled.a`
    font-size: 13px;
    float: right;
    color: #7674ee;
    cursor: pointer;
    
    :hover{
        border-bottom: 1px solid #7674ee;
    }
`;