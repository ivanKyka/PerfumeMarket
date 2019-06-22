import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import ContentContainer from "./ContentDir/ContentContainer";
import FiltersLeftBar from "./FiltersLeftBarDir/FiltersLeftBar";
import FiltersTopBar from "./FiltersTopBarDir/FiltersTopBar";
import CatalogStore from "../../stores/CatalogStore";
import ToolsBar from "./ToolsDir/ToolsBar";
import FiltersDisplayBar from "./FiltersDisplayBarDir/FiltersDisplayBar";

export default class FilterComponentContainer extends Component {

    componentDidMount() {
        this.props.searchMode ? CatalogStore.setSearchRequest(this.props.param) : CatalogStore.setCategory(this.props.param);
    }

    render() {
        return (
            <Container>
                {this.props.searchMode ?
                    ""
                    :
                    (
                        <Fragment>
                            <FiltersLeftBar param={this.props.param}/>
                            <FiltersDisplayBar/>
                        </Fragment>
                    )
                }
                <FiltersTopBar searchMode={this.props.searchMode} searchRequest={this.props.param}/>
                <ContentContainer searchMode={this.props.searchMode}/>
                <ToolsBar searchMode={this.props.searchMode}/>
            </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 50px minmax(0, max-content) 1fr 50px;
    grid-gap: 20px 10px;
`;