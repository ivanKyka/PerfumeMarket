import React, {Component} from 'react'
import styled from 'styled-components'
import CatalogStore from '../../../../stores/CatalogStore'
import OptionsContent from "./OptionsContent";
import HideImgClosed from '../../../../resources/image/Catalog/OptionsComponent/HideImgClosed.png'
import HideImgOpened from '../../../../resources/image/Catalog/OptionsComponent/HideImgOpened.png'

export default class OptionsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsTitle: props.optionsTitle,
            linkTitle: props.linkTitle, // if present || null
            contentType: props.contentType, //    selection || radio
            content: props.content,
            isOpened: false
        };

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen(){
        this.setState({isOpened : !this.state.isOpened})
    }

    render(){
        return(
            <Container>
                <OptionsTitleContainer>
                    <OptionsTitle>
                        {this.state.optionsTitle}
                    </OptionsTitle>
                    <OptionsHideButton onClick={this.toggleOpen} src={this.state.isOpened ? HideImgOpened : HideImgClosed}/>
                </OptionsTitleContainer>
                <OptionsContent
                    contentType = {this.state.contentType}
                    content = {this.state.content}
                    isOpened = {this.state.isOpened}
                />
            </Container>
        )
    }
}

const Container = styled.div`
    margin-top: 10px;
`;

const OptionsTitleContainer = styled.div`
    border-bottom: 1px solid #DADADA;
    padding: 10px;
`;

const OptionsTitle = styled.span`
    font-size: 13px;
    color: black;
`;

const OptionsHideButton = styled.img`
    float: right;
    width: 18px;
    height: 15px;
    cursor: pointer;
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