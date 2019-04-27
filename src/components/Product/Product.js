import React from 'react';
import styled from 'styled-components';
import PhotoGalerry from "./PhotoGalerry";
import PurchaseBlock from "./PurchaseBlock";
import MainTopBar from "../public/MainTopBar";
import Header from '../public/Header';
import Description from "./Description";
import CommentsContainer from "./CommentsContainer";

export default class Product extends React.Component {


render() {
    return(
        <div>
            <MainTopBar />
            <Header />
            <Container>
                <PhotoGalerry ProductID={this.props.match.params.id}/>
                <PurchaseBlock ProductID={this.props.match.params.id}/>
                <Description ProductID={this.props.match.params.id}/>
            </Container>
            <CommentsContainer ProductID={this.props.match.params.id}/>
        </div>
    )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr 5fr;
  min-height: 450px;
`;
