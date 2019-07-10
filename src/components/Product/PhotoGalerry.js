import React from 'react';
import styled from 'styled-components';
import ReactImageMagnify from "react-image-magnify";
import {theme} from '../../stores/StyleStore';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {inject} from "mobx-react";

@inject('store')
export default class PhotoGalerry extends React.Component {

    urlStore = this.props.store.urlStore;

    constructor(props) {
        super(props);
        this.state = {
            currentImage: undefined,
            currentIndex: 0
        }
    }

    clickHandler = (e) => {
        this.setState({
            currentImage: e.target.src,
            currentIndex: e.target.id
        });
        console.log(this.state.currentIndex);
    };


    render() {
        return (<Query query={gql`query ProductPhotos($id: ID!){
  product(id: $id){
        photos{
          url
        }
      }
    }`}
        variables={{"id": this.props.ProductID}}>
            {({loading, error, data}) => {
                if (loading) return <p></p>;
                if (error) {
                    return <p>Error :(</p>;
                }

                try {
                    const images = data.product.photos.map(a => a.url).reverse();
                    return (
                        <Container showGalerry={images.length > 1}>
                            {images.length>1?
                                <Catalog>{images.map((elem, index) => {
                                    return <Image src={this.urlStore.MAIN_URL + elem}
                                                  alt=""
                                                  id={index}
                                                  key={index}
                                                  active={index == this.state.currentIndex}
                                                  onClick={this.clickHandler}
                                                  theme={theme}/>;
                                })}

                                </Catalog>:''}
                            <ImageContainer>
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            isFluidWidth: true,
                                            src: this.state.currentImage?this.state.currentImage:this.urlStore.MAIN_URL + images[0]
                                        },
                                        largeImage: {
                                            src: this.state.currentImage?this.state.currentImage:this.urlStore.MAIN_URL + images[0],
                                            width: 800,
                                            height: 800
                                        },
                                        lensStyle: {backgroundColor: 'rgba(0,0,0,.6)'},
                                        enlargedImageContainerStyle:
                                            {
                                                zIndex: 10000,
                                                background: '#fff'
                                            }
                                    }}
                                />
                            </ImageContainer>
                        </Container>
                    )
                } catch (e) {
                    return <b>Photo not found</b>
                }
            }}
        </Query>)
    }
}
const Container = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: ${props => props.showGalerry?'70px 1fr':'1fr'};
  grid-auto-rows: minmax(min-content, max-content);
  max-width: 35vw;
  grid-gap: 0;
`;

const ImageContainer = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
`;

const Catalog = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(80px, min-content);
`;

const Image = styled.img`
    max-width: 50px;
    max-height: 75px;
    padding: 4px;
    border: ${props => props.active ? ('2px ' + props.theme.primary + ' solid') : '2px white solid'};
    cursor: pointer;
`;
