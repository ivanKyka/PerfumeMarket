import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ContentBlock from './ContentBlock'
import {inject} from "mobx-react";

@inject('store')
export default class Content extends React.Component {

    urlStore = this.props.store.urlStore;

    render() {
        return (
            <Query query={gql`{
                      products{
                            photos{
                          url
                        }
                        rating
                        vendor
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

                    return (
                        data.products.map((content, index) =>
                            <ContentBlock options={
                                {
                                    image: `${this.urlStore.MAIN_URL}${content.photos[0].url}`,
                                    rating: content.rating,
                                    reviews: content.comments.length,
                                    name: content.name_ru,
                                    id: content._id,
                                    vendor: content.vendor,
                                    price: content.price
                                }
                            }/>)

                    )
                }}
            </Query>);
    }
}

