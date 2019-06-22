import React, {Component} from 'react'
import styled from 'styled-components'
import ShowMoreButton from "./ShowMoreButton";
import ScrollToTopButton from "./ScrollToTopButton";

export default class ToolsBar extends Component {
    render(){
        return(
            <Container>
                <ShowMoreButton/>
                <ScrollToTopButton IntervalInMs={10} Step={20}/>
            </Container>
            )
    }
}

const Container = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
`;