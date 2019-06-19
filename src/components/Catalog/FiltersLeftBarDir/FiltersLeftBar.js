import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import OptionsContainer from "./AbstractOptionsComponentDir/OptionsContainer";
import {PanelMenu} from "primereact/PanelMenu";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {categoryTree} from "../../../api/Categories";
import CatalogStore from "../../../stores/CatalogStore";

export default class FiltersLeftBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            model: []
        };

        this.checkIsIn = this.checkIsIn.bind(this);
    }

    componentDidMount() {
        CatalogStore.setID(this.props.CategoryID);

        categoryTree().then(data => {
            for(let i = 0;i < data.length;i++){
                if (this.checkIsIn(data[i], this.props.CategoryID)){
                    console.log(data[i]);
                    let temp = [];
                    temp.push(data[i]);
                    this.setState({model : temp});
                }
            }
        });
    }

    checkIsIn(categories, id) {
        if (categories.items === undefined){
            for (let i = 0; i < categories.length;i++){
                if(categories[i].id === id){
                    return true;
                }
            }
            return false;
        }

        return this.checkIsIn(categories.items, id);
    };

    render() {
        return (
            <Container>
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
                    variables={{"id": this.props.CategoryID}}
                >
                    {({loading, error, data}) => {
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
                                <PanelMenu model={this.state.model}/>
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