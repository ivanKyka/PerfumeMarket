import React, {Component} from 'react'
import styled from 'styled-components'
import ShowMoreButton from "./ShowMoreButton";
import ScrollToTopButton from "./ScrollToTopButton";

export default class ToolsBar extends Component {
    render(){
        return(
            <Container>
                <ShowMoreButton/>
                <ScrollToTopButton/>
            </Container>
            )
    }
}

const Container = styled.div`
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;    
    
    align-items: center;
`;