import React, {Component} from 'react'
import styled from 'styled-components'
import ShowMoreButton from "./ShowMoreButton";
import ScrollToTopButton from "./ScrollToTopButton";
import CatalogStore from "../../../stores/CatalogStore";

export default class ToolsBar extends Component {
    render(){
        return(
            <Container searchMode={this.props.searchMode}>
                {CatalogStore.moreThanCurrent ? <ShowMoreButton/> : ""}
                <ScrollToTopButton IntervalInMs={10} Step={20}/>
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