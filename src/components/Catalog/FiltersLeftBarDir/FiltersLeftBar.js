import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import OptionsContainer from "./AbstractOptionsComponentDir/OptionsContainer";
import {PanelMenu} from "primereact/PanelMenu";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {categoryTree} from "../../../api/Categories";
import CatalogStore from "../../../stores/CatalogStore";
import {toJS} from "mobx";

export default class FiltersLeftBar extends Component {
    constructor(props) {
        super(props);

        this.currentCategory = null;

        this.state = {
            categories: [],
            model: [],
            isLastChildID : false
        };

        this.checkIsIn = this.checkIsIn.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {
        categoryTree().then(categories => {
            console.log(categories);
            for(let i = 0;i < categories.length;i++){
                if (this.checkIsIn(categories[i], this.props.CategoryID)){
                    let temp = [];
                    temp.push(categories[i]);
                    this.setState({model : temp});
                    this.getCategories(this.currentCategory);
                    return;
                }
            }
        });
    }

    getCategories(topLevelCategory){
        if (topLevelCategory.lastChild){
            CatalogStore.addCategoriesToFilters(topLevelCategory.id);
            return;
        }

        if (topLevelCategory.items){
            topLevelCategory.items.forEach(el => {
                this.getCategories(el);
            });
        }

    }

    checkIsIn(categories, id) {
        if (categories.id === id){
            if (categories.lastChild){
                this.setState({isLastChildID : true});
            }

            this.currentCategory = categories;

            return true;
        }

        if (categories.items){
            return categories.items.map(el => this.checkIsIn(el, id));
        } else {
            return false;
        }
    };

    render() {
        let category = CatalogStore.category;
        let categoryJS = toJS(category);

        console.log("Category filter", categoryJS);
        return (
            <Container>
                <PanelMenu model={this.state.model}/>
                {this.state.isLastChildID && categoryJS._id ?
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
                        variables={{"id": categoryJS._id}}
                    >
                        {({loading, error, data, refetch}) => {
                            CatalogStore.refetchCategory = refetch;

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
    
    padding-left: 10px;
    
    /*> .p-panelmenu .p-component{
        width: 280px;
    }*/
    
    .p-panelmenu .p-panelmenu-header > a:focus{
        box-shadow: none !important;
    }
    
    .p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:focus{
        outline: 0 none;
        outline-offset: 0;
        box-shadow: none !important;
    }
    
    /*li.p-menuitem{
        display: inline-block !important;
        width: 280px !important;
    }*/
    
    /*div.p-panelmenu-content{
        width: 280px !important;
    }*/
    
    > .p-menubar{
        border: none;
        
        > ul .p-menuitem{
            display: block;
        }
    }
    
    > .p-panelmenu .p-panelmenu-header.p-highlight > a {
        border: none !important;;
        background-color: transparent !important;
    }
    
    > .p-panelmenu .p-panelmenu-header.p-highlight > a:hover{
        border: none !important;
        background-color: transparent !important;
    }
    
    > .p-panelmenu .p-panelmenu-header.p-highlight > a{
        color: black !important;
    }
`;