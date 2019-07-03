import React from 'react';
import Collapsible from "react-collapsible";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
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

    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    render() {
        return (
            <CollapsibleContainer opened={this.state.opened}>
                <Collapsible
                    trigger={
                        <Trigger>
                            <Header theme={theme}
                                    opened={this.state.opened}>
                                {this.props.elem.header}
                                <FontAwesomeIcon icon={this.state.opened ? faTimes : faPlus}/>
                            </Header>
                            <Preview opened={this.state.opened}>
                                <ReactMarkdown source={this.props.elem.body.split(' ').slice(0, 15).join(' ')}/>
                            </Preview>
                        </Trigger>
                    }
                    onOpening={this.openHandler}
                    onClosing={this.closeHandler}
                    transitionTime={1}
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
    margin-top: 0;
    padding-top: 0;
`;


const Trigger = styled.div`
    grid-template-columns: 1fr 20px;
`;

const Body = styled.div`
    padding: 15px 0;
    font-size: 11pt;
    text-align: left;
    & > *{
      margin: 0 auto;
    }
`;

const Preview = styled.div`
    grid-column: 1/3;
    display: ${props => props.opened?'none':'block'};
    color: #aaa;
    text-align: left;
    font-size: 11pt;
    font-family: "Gotham Pro Light";
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  font-size: 14pt;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  text-transform: uppercase;
  font-family: "Gotham Pro Bold";
  
  &:hover{
    color: ${props => props.theme.primary_light};
  }    
`;