import React from 'react';
import Collapsible from "react-collapsible";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {theme} from '../../stores/StyleStore';

export default class DescriptionBlock extends React.Component {

    openHandler = (() => {
        this.setState({
            opened: true
        });
    }).bind(this);
    closeHandler = (() => {
        this.setState({
            opened: false
        });
    }).bind(this);

    constructor(props){
        super(props);
        this.state = {
            opened: false
        }
    }

render() {
    return(
        <CollapsibleContainer  opened={this.state.opened}>
            <Collapsible
                trigger={
                    <Header theme={theme}
                            opened={this.state.opened}>
                        {this.props.elem.header}
                        <FontAwesomeIcon icon={this.state.opened?faChevronUp:faChevronDown}/>
                    </Header>}
                onOpening={this.openHandler}
                onClosing={this.closeHandler}
            >
                <Body>
                    <ReactMarkdown source={this.props.elem.body}/>
                </Body>
            </Collapsible>
        </CollapsibleContainer>
    )
    }
}

const CollapsibleContainer = styled.div`
    .Collapsible {
      width: 100%;
    }
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;

`;


const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
  font-size: 14pt;
  cursor: pointer;
  
  &:hover{
    color: ${props => props.theme.primary_light};
  }
`;

const Body = styled.div`
    padding: 15px;
    & > *{
      margin: 0 auto;
    }
`;
