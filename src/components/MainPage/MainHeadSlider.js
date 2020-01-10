import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {inject} from "mobx-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

@inject('store')
export default class MainHeadSlider extends React.Component {

    urlStore = this.props.store.urlStore;

    constructor(props){
        super(props);

        this.galerry = React.createRef();
        this.disableSwipe = this.disableSwipe.bind(this);
        this.enableSwipe = this.enableSwipe.bind(this);
    }

    disableSwipe(e){
        e.stopPropagation();
        this.galerry.current.pause();
    }


    enableSwipe(e){
        e.stopPropagation();
        this.galerry.current.play();
    }



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
                            original: `${this.urlStore.MAIN_URL}${content.image[1] ? content.image[1].url : content.image[0].url}`,
                            link: `${content.link}`
                        });
                    });
                    return (<ImageGallery items={images}
                                          showThumbnails={false}
                                          autoPlay={true}
                                          showBullets={true}
                                          slideInterval={5000}
                                          showPlayButton={false}
                                          showFullscreenButton={false}
                                          onMouseOver={this.disableSwipe}
                                          onMouseLeave={this.enableSwipe}
                                          ref={this.galerry}
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
