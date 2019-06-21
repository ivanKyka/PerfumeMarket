import React, {Component} from 'react'
import styled from 'styled-components'
import ContentContainer from "./ContentDir/ContentContainer";
import FiltersLeftBar from "./FiltersLeftBarDir/FiltersLeftBar";
import FiltersTopBar from "./FiltersTopBarDir/FiltersTopBar";
import CatalogStore from "../../stores/CatalogStore";
import ToolsBar from "./ToolsDir/ToolsBar";

export default class FilterComponentContainer extends Component{

    componentDidMount() {
        CatalogStore.setCategory(this.props.CategoryID);
    }

    render(){
        return(
            <Container>
                <FiltersLeftBar CategoryID={this.props.CategoryID}/>
                <FiltersTopBar/>
                <ContentContainer/>
                <ToolsBar></ToolsBar>
            </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 50px 1fr 50px;
    grid-gap: 20px 10px;
`;