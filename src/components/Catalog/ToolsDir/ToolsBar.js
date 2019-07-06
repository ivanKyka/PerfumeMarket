import React, {Component} from 'react'
import styled from 'styled-components'
import ShowMoreButton from "./ShowMoreButton";
import ScrollToTopButton from "./ScrollToTopButton";
import CatalogStore from "../../../stores/CatalogStore";
import {toJS} from "mobx";
import {observer} from "mobx-react";

@observer
export default class ToolsBar extends Component {
    render(){
        let isMoreDataThanLimit = CatalogStore.isMoreDataThanLimit;
        return(
            <Container searchMode={this.props.searchMode}>
                {toJS(isMoreDataThanLimit) ? <ShowMoreButton/> : ""}
                <ScrollToTopButton IntervalInMs={16} Step={40}/>
            </Container>
            )
    }
}

const Container = styled.div`
    grid-column-start: ${props => props.searchMode ? '1' : "2"};
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
`;