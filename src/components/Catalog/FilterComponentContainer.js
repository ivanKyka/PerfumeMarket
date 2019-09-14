import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import ContentContainer from "./ContentDir/ContentContainer";
import FiltersLeftBar from "./FiltersLeftBarDir/FiltersLeftBar";
import FiltersTopBar from "./FiltersTopBarDir/FiltersTopBar";
import CatalogStore from "../../stores/CatalogStore";
import ToolsBar from "./ToolsDir/ToolsBar";
import FiltersDisplayBar from "./FiltersDisplayBarDir/FiltersDisplayBar";
import {UrlStore} from "../../stores/UrlStore";
import Query from "react-apollo/Query";
import gql from "graphql-tag";
import MetaTags from "react-meta-tags";

export default class FilterComponentContainer extends Component {

    componentDidMount() {
        this.props.searchMode ? CatalogStore.setSearchRequest(this.props.param) : CatalogStore.setCategory(this.props.param);

        let string = window.location.href;
        if ((new URL(string)).search !== "") {
            fetch(UrlStore.MAIN_GRAPHQL_URI, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: '{ properties(limit: -1){ _id property_val } }'}),
            })
                .then(res => res.json())
                .then(data => {
                    let urlValues = CatalogStore.getParametresFromURL(string);
                    data.data.properties.forEach((property) => {
                        if (urlValues.includes(property.property_val)) {
                            console.log("Found property", property);
                            CatalogStore.setFiltersFromLeftBar(property._id);
                        }
                    });
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                {location.pathname.split('/').pop().includes('&')?
                    <MetaTags>
                        <title>Поиск: {decodeURIComponent(location.pathname.split('/').pop().substring(1))}</title>
                    </MetaTags>:
                    <Query
                        query={gql`
                    query($id: ID!){
                      category(id: $id){
                        name_ru
                      }
                    }`}
                        variables={{'id': location.pathname.split('/').pop()}}
                    >
                        {({loading,error,data}) => {
                            if (loading) return ''
                            return <MetaTags>
                                <title>Категория: {data.category.name_ru}</title>
                            </MetaTags>
                        }
                        }
                    </Query>}
                <Container>
                    <FiltersDisplayBar/>
                    <FiltersLeftBar param={this.props.param} searchMode={this.props.searchMode}/>
                    <FiltersTopBar searchMode={this.props.searchMode} searchRequest={this.props.param}/>
                    <ContentContainer searchMode={this.props.searchMode}/>
                    <ToolsBar searchMode={this.props.searchMode}/>
                </Container>
            </React.Fragment>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 50px minmax(0, max-content) 1fr 50px;
    grid-gap: 20px 10px;
`;