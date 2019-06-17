import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {inject} from "mobx-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

@inject('store')
export default class MainHeadSlider extends React.Component {

    urlStore = this.props.store.urlStore;

    render() {
        return (
            <Query query={gql`{
                      slidercontents{
                        link
                        image {
                          url
                        }
                      }
                    }`}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        console.log(error);
                        return <p>Error :(</p>;
                    }
                    const images = data.slidercontents.map((content, index) => {
                        return ({
                            original: `${this.urlStore.MAIN_URL}${content.image.url}`,
                            thumbnail: `${this.urlStore.MAIN_URL}${content.image.url}`,
                            link: `${content.link}`
                        });
                    });
                    return (<ImageGallery items={images}
                                          showThumbnails={false}
                                          showBullets={true}
                                          showPlayButton={false}
                                          showFullscreenButton={false}
                                          renderItem={(item, index) => {
                                              return (
                                                  <div className={'image-gallery-image'}>
                                                      <a href={item.link}>
                                                          <img src={item.original} alt=""/>
                                                      </a>
                                                  </div>
                                              )

                                          }}
                    />);
                }}
            </Query>);
    };


}