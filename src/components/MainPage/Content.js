import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ContentBlock from './ContentBlock'

const Content = () => (
    <Query query={gql`{
                      products{
                            photos{
                          url
                        }
                        rating
                        comments{
                          rate
                        }
                        name_ru
                        _id
                        desc
                    price
                  }
                }`}>
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return(
                    data.products.map((content, index) =>
                        <ContentBlock options={
                            {
                                image: `https://pure-chamber-16886.herokuapp.com${content.photos[0].url}`,
                                rating: content.rating,
                                reviews: content.comments.length,
                                name: content.name_ru,
                                id: content._id,
                                desc: content.desc,
                                price: content.price
                            }
                        }/>)

            )
        }}
    </Query>);


export default Content;
