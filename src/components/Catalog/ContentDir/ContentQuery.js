import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import ContentBlock from './ContentBlock'
import {inject, observer} from "mobx-react";
import CatalogStore from '../../../stores/CatalogStore'
import {toJS} from "mobx";
import {UrlStore} from "../../../stores/UrlStore";
import {PRODUCTS_BY_FILTERS_PAGINATED} from "../../../stores/Queries";
import ShowMoreButtonWrapper from "./ShowMoreButtonWrapper";

@inject('store')
@observer
export default class ContentQuery extends React.Component {

    urlStore = this.props.store.urlStore;

    normalizeFilterObject = (filterObject) => {
        if (filterObject.category._id.length === 0) {
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

    getProductsCount = async (filters) => {
        let response = await fetch(UrlStore.MAIN_GRAPHQL_URI, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `
                    query Products_by_filters($filters: JSON!){
                        products(start: 0, limit: -1, where: $filters){
                                        properties{
                                            property_name
                                            property_val
                                            _id
                                        }               
                        }
                    }
            `,
                variables: {filters: filters}
            }),
        });

        let json = await response.json();
        CatalogStore.productsCount = json.data.products.length;
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

        this.normalizeFilterObject(filtersJS);

        return (
            <Query
                query={PRODUCTS_BY_FILTERS_PAGINATED}
                fetchPolicy={'cache'}
                variables={{
                    filters: filtersJS,
                    sortOption: sortOptionJS,
                    limit: limitJS,
                    startFrom: startFromJS
                }}
            >
                {({loading, error, data, refetch, fetchMore}) => {
                    CatalogStore.refetch = refetch;
                    CatalogStore.fetchMore = fetchMore;

                    if (loading) {
                        CatalogStore.isMoreDataThanLimit = false;
                        return <span></span>;
                    }

                    if (error) return <p>Error :( `${error.message}`</p>;

                    this.getProductsCount(filtersJS).then(() => {
                        CatalogStore.checkIsMoreDataThan(startFromJS + data.products.length);
                    });

                    CatalogStore.fetchMore = () => {
                        fetchMore({
                            variables: {
                                startFrom: startFromJS + data.products.length,
                            },
                            updateQuery: (prev, {fetchMoreResult}) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                    products: [...prev.products, ...fetchMoreResult.products],
                                });
                            },
                        });
                        CatalogStore.checkIsMoreDataThan(data.products.length + CatalogStore.limit);
                    };

                    return (
                        <Fragment>
                            {(data.products || []).map((content, index) => {
                                return (
                                    <ContentBlock
                                        key={index}
                                        options={
                                            {
                                                image: `${content.photos[0] ? this.urlStore.MAIN_URL + content.photos[0].url : ""}`,
                                                rating: content.rating,
                                                reviews: content.comments.length,
                                                name: content.name_ru,
                                                id: content._id,
                                                vendor: content.vendor,
                                                price: content.price
                                            }
                                        }
                                    />
                                )
                            })
                            }
                            <ShowMoreButtonWrapper/>
                        </Fragment>
                    )
                }}
            </Query>
        );
    }
}

