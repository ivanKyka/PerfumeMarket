import gql from "graphql-tag";

export let CATEGORIES_BY_SINGLE_ID = gql`
                        query CATEGORIES_BY_SINGLE_ID($id: ID!){
                            category(id: $id){
                                name_ru
                                properties{
                                    property_name
                                    _id
                                    property_val
                                }
                            }
                        }
                    `;

export let PRODUCTS_BY_REQUEST = gql`
                        query PRODUCTS_BY_REQUEST($request: String!){
                            products(limit: -1, where: {
                                                            _q: $request
                                                            
                                                        }){
                                                           properties{
                                                               property_name
                                                               _id
                                                               property_val
                                                           }
                            }
                        }
                    `;

export let PRODUCTS_BY_TOP_LEVEL_CATEGORY = gql`
    query PRODUCTS_BY_TOP_LEVEL_CATEGORY($categories: JSON!){
        products(limit: -1, where: {
            category: $categories
        }){
            properties{
                property_name
                _id
                property_val
            }
        }
    }
`;

export let PRODUCTS_BY_FILTERS_PAGINATED = gql`query PRODUCTS_BY_FILTERS($filters: JSON!, $sortOption: String!, $limit: Int!, $startFrom: Int!){
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
                          avaliable
                          vendor
                          comments{
                            rate
                          }
                          gift_status
                          name_ru
                          _id
                          desc
                          price
                          discount_price
                          createdAt
                      }
                }`;

export let ALL_PROPERTIES = gql`query{
                        properties(limit: -1){
                            _id
                            property_val
                        }
                    }`;