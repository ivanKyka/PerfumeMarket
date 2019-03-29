import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const MainHeadSlider = () => (
            <Query query={gql`{
                      slidercontents{
                        link
                        image {
                          url
                        }
                      }
                    }`}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return(
                        <Carousel autoPlay showThumbs={false} infiniteLoop={true} showStatus={false} stopOnHover={false}>
                            {data.slidercontents.map((content, index) =>
                                <a href={`${content.link}`}>
                                    <div key={index} style={{background:'white'}}>
                                        <img src={`https://pure-chamber-16886.herokuapp.com${content.image.url}`} alt="" style={{height: '450px', width: '100%'}}/>
                                    </div>
                                </a>)}
                        </Carousel>
                    )
                }}
            </Query>);


export default MainHeadSlider