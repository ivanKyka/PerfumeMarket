import React, {Component} from 'react'
import styled from 'styled-components'
import ScrollToTopButton from "./ScrollToTopButton";
import {observer} from "mobx-react";
import PaginationComponent from "./PaginationComponentDir/PaginationComponent";

@observer
export default class ToolsBar extends Component {

    render() {
        return (
            <Container searchMode={this.props.searchMode}>
                <PaginationComponent/>
                <ScrollToTopButton IntervalInMs={16} Step={40}/>
            </Container>
        )
    }
}

const Container = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
`;