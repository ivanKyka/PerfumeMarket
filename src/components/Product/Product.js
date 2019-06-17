import React from 'react';
import styled from 'styled-components';
import PhotoGalerry from "./PhotoGalerry";
import PurchaseBlock from "./PurchaseBlock";
import Header from "../public/Header";
import HeadCatalog from '../public/HeadCatalog';
import Description from "./Description";
import CommentsContainer from "./CommentsContainer";
import Footer from "../public/Footer";

export default class Product extends React.Component {


render() {
    return(
        <div>
            <Header />
            <HeadCatalog />
            <Container>
                <PhotoGalerry ProductID={this.props.match.params.id}/>
                <PurchaseBlock ProductID={this.props.match.params.id}/>
                <Description ProductID={this.props.match.params.id}/>
            </Container>
            <CommentsContainer ProductID={this.props.match.params.id}/>
            <Footer/>
        </div>
    )
    }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr 5fr;
  min-height: calc(100vh - 412px);
`;
