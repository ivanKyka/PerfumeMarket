import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import OptionsContainer from "./AbstractOptionsComponentDir/OptionsContainer";
import {PanelMenu} from "primereact/PanelMenu";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {categoryTree} from "../../../api/Categories";
import CatalogStore from "../../../stores/CatalogStore";
import Catalog from "../ContentDir/Catalog";
import {toJS} from "mobx";

export default class FiltersLeftBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            model: [],
            isLastChildID : false
        };

        this.checkIsIn = this.checkIsIn.bind(this);
        //this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {
        categoryTree().then(categories => {
            for(let i = 0;i < categories.length;i++){
                if (this.checkIsIn(categories[i], this.props.CategoryID)){
                    let temp = [];
                    temp.push(categories[i]);
                    this.setState({model : temp});
                }
            }

            console.log(this.state.model[0]);
            //this.getCategories(this.state.model[0]);
        });
    }

    /*getCategories(topLevelCategory){
        if (topLevelCategory.lastChild){
            CatalogStore.setCategory(topLevelCategory.id);
            return;
        }

        if (topLevelCategory.items){
            topLevelCategory.items.forEach(el => {
                this.getCategories(el);
            });
        }

    }*/

    checkIsIn(categories, id) {
        if (categories.id !== id){
            if (categories.items !== undefined){
                for (let i = 0;i < categories.items.length;i++){
                    if (categories.items[i].id === id) {
                        if (categories.items[i].lastChild){
                            this.setState({isLastChildID : true})
                        }
                        return true;
                    }
                }
                return this.checkIsIn(categories.items, id);
            }
            return false;
        }

        if (categories.lastChild){
            this.setState({isLastChildID : true})
        }

        return true;
    };

    render() {
        let filters = CatalogStore.filters;
        let filtersJS = toJS(filters);

        if (!filtersJS.category._id) {
            filtersJS.category._id = this.props.CategoryID;
        }

        console.trace(filtersJS);

        return (
            <Container>
                <PanelMenu model={this.state.model}/>
                {this.state.isLastChildID ?
                    <Query
                        query={gql`
                        query GET_CATEGORIES($id: ID!){
                            category(id: $id){
                                name_ru
                                properties{
                                    property_name
                                    id
                                    property_val
                                }
                            }
                        }
                    `}
                        variables={{"id": filtersJS.category._id}}
                    >
                        {({loading, error, data, refetch}) => {
                            CatalogStore.refetchCategories = refetch;

                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;

                            let properties = data.category.properties.reduce((ac, cv) => {
                                ac[cv.property_name] = ac[cv.property_name] || [];
                                ac[cv.property_name].push({
                                    property_val : cv.property_val,
                                    id: cv.id
                                });
                                return ac;
                            }, []);

                            let propertiesIndexed = [];

                            for(let property in properties){
                                propertiesIndexed.push({
                                    title: property,
                                    content: properties[property],
                                })
                            }

                            return (
                                <Fragment>
                                    {
                                        propertiesIndexed.map((el, i, arr) => {
                                            return(
                                                <OptionsContainer
                                                    optionsTitle={el.title}
                                                    contentType={"selection"}
                                                    content={el.content}
                                                />)
                                        })
                                    }
                                </Fragment>

                            );
                        }}
                    </Query>
                    :
                    ""
                }

            </Container>
        );
    }
}

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    z-index: 20;
    
    padding-left: 60px;
    
    > .p-menubar{
        border: none;
        
        > ul .p-menuitem{
            display: block;
        }
    }
`;