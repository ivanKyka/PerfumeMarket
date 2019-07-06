import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import ContentBlock from './ContentBlock'
import {inject, observer} from "mobx-react";
import CatalogStore from '../../../stores/CatalogStore'
import {toJS} from "mobx";

@inject('store')
@observer
export default class Content extends React.Component {

    lastStartFromValue = 0;
    urlStore = this.props.store.urlStore;

    normalizeFilterObject = (filterObject) => {
        if (filterObject.category._id.length === 0){
            filterObject.category._id = {};
        }
        if (filterObject.properties._id.length === 0)
            filterObject.properties._id = {};
        if (filterObject.price_gte === null)
            filterObject.price_gte = {};
        if (filterObject.price_lte === null)
            filterObject.price_lte = {};
        if (filterObject.name_ru_contains === "")
            filterObject.name_ru_contains = {};
    };

    render() {
        let filters = CatalogStore.filters;
        let sortOption = CatalogStore.sortOption;
        let sortOptionJS = toJS(sortOption);
        let filtersJS = toJS(filters);
        let limit = CatalogStore.limit;
        let limitJS = toJS(limit);
        let startFrom = CatalogStore.startFrom;
        let startFromJS = toJS(startFrom);

        console.log(filtersJS);

        this.normalizeFilterObject(filtersJS);

        //while(typeof filters.category._id === "Object");

        return (
            <Fragment>
                <Query
                    query={gql`query Products_by_filters($filters: JSON!, $sortOption: String!, $limit: Int!, $startFrom: Int!){
                        products(start: $startFrom, limit: $limit, sort: $sortOption, where: $filters){
                            category{
                                _id
                            }
                            properties{
                                property_name
                                property_val
                                _id
                               
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
                          createdAt
                      }
                }`}
                    fetchPolicy={'cache'}
                    variables={{filters : filtersJS, sortOption : sortOptionJS, limit: limitJS, startFrom: startFromJS}}
                >
                    {({loading, error, data, refetch}) => {
                        CatalogStore.refetch = refetch;

                        if (loading) return <p></p>;
                        if (error) return <p>Error :(</p>;

                        if (CatalogStore.startFrom !== this.lastStartFromValue){
                            CatalogStore.products = CatalogStore.products.concat(data.products);
                            this.lastStartFromValue = CatalogStore.startFrom;
                        } else{
                            CatalogStore.products = data.products;
                            CatalogStore.startFrom = 0;
                        }

                        CatalogStore.checkIsMoreDataThan();

                        return (
                            CatalogStore.products.map((content, index) =>
                                <ContentBlock
                                    key={index}
                                    options={
                                        {
                                            image: `${content.photos[0] ? this.urlStore.OLALALA_MAIN_URL + content.photos[0].url : ""}`,
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
                </Query>
            </Fragment>
            );
    }
}

