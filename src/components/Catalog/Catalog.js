import React from 'react';
import Footer from "../public/Footer";
import Header from "../public/Header";
import FilterComponentContainer from "./FilterComponentContainer";
import styled from 'styled-components'
import HeadCatalog from "../public/HeadCatalog";
import ReactGA from "react-ga";


export default class Catalog extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchMode: props.match.params.id.charAt(0) === '&',
        }
    }
    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
    }

    render() {
        return(
        <Container>
            <Header/>
            <HeadCatalog/>
                <FilterComponentContainer searchMode={this.state.searchMode} param={this.state.searchMode ? this.props.match.params.id.substring(1) : this.props.match.params.id}/>
            <Footer/>
        </Container>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;

`;
