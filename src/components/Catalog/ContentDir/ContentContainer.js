import React from 'react';
import styled from "styled-components";
import ContentQuery from "./ContentQuery";
import ContentQueryTemp from "./ContentQuery";


export default class ContentContainer extends React.Component {

    render() {

        return(
            <React.Fragment>
                <Container searchMode={this.props.searchMode}>
                    <ContentQueryTemp/>
                </Container>
            </React.Fragment>
        )
    }

}

const Container = styled.div`
  padding: 0;
  display: grid;
  
  @media(max-width: 1100px) {
      grid-template-columns: 1fr 1fr ${props => props.searchMode ? '1fr' : ''};
  }
  @media(min-width: 1101px) {
    grid-template-columns: 1fr 1fr 1fr ${props => props.searchMode ? '1fr' : ''};
  }
  
  margin: 25px 2%;
  
  grid-column-gap: 5px;
  grid-row-gap: 20px;
  grid-auto-rows: 400px;
  justify-items: center;
  
  grid-column-start: ${props => props.searchMode ? '1' : '2'};
  grid-row-start: 3;
  grid-column-end: 3;
  grid-row-end: 4;
`;


