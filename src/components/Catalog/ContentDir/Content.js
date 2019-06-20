import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import ContentBlock from './ContentBlock'
import {inject, observer} from "mobx-react";
import CatalogStore from '../../../stores/CatalogStore'
import {toJS} from "mobx";

@inject('store')
@observer
export default class Content extends React.Component {

    urlStore = this.props.store.urlStore;

    componentDidMount() {

    }

    optimizeFilterObject = (filterObject) => {
        /*if (filterObject.category._id.length === 0){
            filterObject.category._id = {};
        }*/
        if (filterObject.properties._id.length === 0)
            filterObject.properties._id = {};
        if (filterObject.price_gte === null)
            filterObject.price_gte = {};
        if (filterObject.price_lte === null)
            filterObject.price_lte = {};
        if (filterObject._q === "")
            filterObject._q = {};
    };

    render() {
        let filters = CatalogStore.filters;
        let filtersJS = toJS(filters);
        console.log(filtersJS);

        this.optimizeFilterObject(filtersJS);

        return (
            <Query
                query={gql`query Products_by_filters($filters: JSON!){
                        products(where : $filters){
                            category{
                                _id
                            }
                            properties{
                                property_name
                                property_val
                                id
                               
                          }
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
                }`}
                fetchPolicy={'no-cache'}
                variables={{filters: /*filtersJS.properties._id.length === 0 ? {} : */filtersJS}}
            >
                {({loading, error, data, refetch}) => {
                    CatalogStore.refetch = refetch;

                    if (loading) return <p></p>;
                    if (error) return <p>Error :(</p>;

                    console.log(data);

                    return (
                        data.products.map((content, index) =>
                            <ContentBlock
                                key={index}
                                options={
                                    {
                                        image: `${this.urlStore.MAIN_URL}${content.photos[0].url}`,
                                        rating: content.rating,
                                        reviews: content.comments.length,
                                        name: content.name_ru,
                                        id: content._id,
                                        vendor: content.vendor,
                                        price: content.price
                                    }
                                }

                            />)

                    )
                }}
            </Query>);
    }
}

