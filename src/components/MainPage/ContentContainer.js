import React from 'react';
import ContentBlock from "./ContentBlock";
import styled from "styled-components";


export default class ContentContainer extends React.Component {

    render() {

        return(
            <Container>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
                <ContentBlock/>
            </Container>
        )
    }

}

const Container = styled.div`
  width: calc(100% - 100px);
  margin: 25px 50px 15px 50px;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  grid-auto-rows: 400px;
`;



