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

    urlStore = this.props.store.urlStore;

    componentDidMount() {

    }

    normalizeFilterObject = (filterObject) => {
        if (filterObject.category._id.length === 0){
            filterObject.category._id = {};
        }
        if (filterObject.properties._id_in.length === 0)
            filterObject.properties._id_in = {};
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
        console.log(filtersJS);
        console.log(sortOptionJS);

        this.normalizeFilterObject(filtersJS);

        return (
            <Fragment>
                <Query
                    query={gql`query Products_by_filters($filters: JSON!, $sortOption: String!, $limit: Int!){
                        products(limit: $limit, sort: $sortOption, where: $filters){
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
                    fetchPolicy={'no-cache'}
                    variables={{filters : filtersJS, sortOption : sortOptionJS, limit: limitJS}}
                >
                    {({loading, error, data, refetch}) => {
                        CatalogStore.refetch = refetch;

                        if (loading) return <p></p>;
                        if (error) return <p>Error :(</p>;

                        console.log(data);

                        CatalogStore.moreThanCurrent = data.products.length >= limit;

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
                </Query>
            </Fragment>
            );
    }
}

