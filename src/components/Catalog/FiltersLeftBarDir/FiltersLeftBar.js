import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import OptionsContainer from "./AbstractOptionsComponentDir/OptionsContainer";
import {Query} from "react-apollo";
import {categoryTree} from "../../../api/Categories";
import CatalogStore from "../../../stores/CatalogStore";
import {toJS} from "mobx";
import EmptyOptionsBlock from "./AbstractOptionsComponentDir/EmptyOptionsBlock";
import {CATEGORIES_BY_SINGLE_ID, PRODUCTS_BY_REQUEST} from "../../../stores/Queries";

export default class FiltersLeftBar extends Component {
    constructor(props) {
        super(props);

        this.currentCategory = null;

        this.state = {
            categories: [],
            model: [],
            isLastChildID: false
        };

        this.checkIsIn = this.checkIsIn.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.renderSkeletonOptions = this.renderSkeletonOptions.bind(this);
    }

    componentDidMount() {
        categoryTree().then(categories => {
            for (let i = 0; i < categories.length; i++) {
                if (this.checkIsIn(categories[i], this.props.param)) {
                    let temp = [];
                    temp.push(categories[i]);
                    this.setState({model: temp});
                    this.getCategories(this.currentCategory);
                    return;
                }
            }
        });
    }

    getCategories(topLevelCategory) {
        if (!topLevelCategory)
            return;

        if (topLevelCategory.lastChild) {
            CatalogStore.addCategoriesToFilters(topLevelCategory.id);
            return;
        }

        if (topLevelCategory.items) {
            topLevelCategory.items.forEach(el => {
                this.getCategories(el);
            });
        }

    }

    checkIsIn(categories, id) {
        if (categories.id === id) {
            if (categories.lastChild) {
                this.setState({isLastChildID: true});
            }

            this.currentCategory = categories;

            return true;
        }

        if (categories.items) {
            return categories.items.map(el => this.checkIsIn(el, id));
        } else {
            return false;
        }
    };

    renderSkeletonOptions() {
        return (
            <Fragment>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
                <EmptyOptionsBlock/>
            </Fragment>
        )
    }

    render() {
        let category = CatalogStore.category;
        let categoryJS = toJS(category);

        return (
            <Container>
                {this.props.searchMode ?
                    (() => {
                        return (
                            <Query
                                query={PRODUCTS_BY_REQUEST}
                                variables={{
                                    request: CatalogStore.searchRequestForSearchMode
                                }}
                                fetchPolicy={'cache'}
                            >
                                {({loading, error, data, refetch}) => {
                                    CatalogStore.refetchCategory = refetch;
                                    if (loading) return this.renderSkeletonOptions();
                                    if (error) return this.renderSkeletonOptions();

                                    let properties = data.products.reduce((ac, cv) => {
                                        cv.properties.forEach(property => {
                                            ac[property.property_name] = ac[property.property_name] || [];

                                            if (ac[property.property_name].filter(val => val.id === property._id).length > 0) {

                                            } else {
                                                ac[property.property_name].push({
                                                    property_val: property.property_val,
                                                    id: property._id
                                                });
                                            }
                                        });
                                        return ac;
                                    }, {});


                                    let propertiesIndexed = [];

                                    for (let property in properties) {
                                        propertiesIndexed.push({
                                            title: property,
                                            content: properties[property],
                                        })
                                    }

                                    return (
                                        <Fragment>
                                            {
                                                propertiesIndexed.map((el, i, arr) => {
                                                    return (
                                                        <OptionsContainer
                                                            optionsTitle={el.title}
                                                            contentType={"selection"}
                                                            content={el.content}
                                                            key={i}
                                                        />)
                                                })
                                            }
                                        </Fragment>

                                    );
                                }}
                            </Query>
                        )
                    })()
                    :
                    (() => this.state.isLastChildID && categoryJS._id ?
                            <Query
                                query={CATEGORIES_BY_SINGLE_ID}
                                variables={{"id": categoryJS._id}}
                            >
                                {({loading, error, data, refetch}) => {
                                    CatalogStore.refetchCategory = refetch;

                                    if (loading) return this.renderSkeletonOptions();
                                    if (error) return `Error! ${error.message}`;

                                    let properties = data.category.properties.reduce((ac, cv) => {
                                        ac[cv.property_name] = ac[cv.property_name] || [];
                                        ac[cv.property_name].push({
                                            property_val: cv.property_val,
                                            id: cv._id
                                        });
                                        return ac;
                                    }, []);

                                    let propertiesIndexed = [];

                                    for (let property in properties) {
                                        propertiesIndexed.push({
                                            title: property,
                                            content: properties[property],
                                        })
                                    }

                                    return (
                                        <Fragment>
                                            {
                                                propertiesIndexed.map((el, i, arr) => {
                                                    return (
                                                        <OptionsContainer
                                                            optionsTitle={el.title}
                                                            contentType={"selection"}
                                                            content={el.content}
                                                            key={i}
                                                        />)
                                                })
                                            }
                                        </Fragment>

                                    );
                                }}
                            </Query>
                            :
                            ""
                    )()
                }
            </Container>
        );
    }
}

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 5;
    z-index: 20;
    
    padding-left: 10px;
    
    .p-panelmenu .p-panelmenu-header > a:focus{
        box-shadow: none !important;
    }
    
    .p-panelmenu .p-panelmenu-header > a{
        font-size: 13px !important;
    }
    
    .p-menuitem-text{
        font-size: 13px !important;
    }
    
    .p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:focus{
        outline: 0 none;
        outline-offset: 0;
        box-shadow: none !important;
    }
    
    > .p-menubar{
        border: none;
        
        > ul .p-menuitem{
            display: block;
        }
    }
    
    > .p-panelmenu .p-panelmenu-header.p-highlight > a {
        border: 1px solid rgba(128,128,128,0.58) !important;
        background-color: transparent !important;
    }
    
    > .p-panelmenu .p-panelmenu-header.p-highlight > a:hover{
        border: 1px solid rgba(128,128,128,0.58) !important;
        background-color: transparent !important;
    }
    
    > .p-panelmenu .p-panelmenu-header.p-highlight > a{
        color: black !important;
    }
`;