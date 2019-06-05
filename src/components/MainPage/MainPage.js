import React, { Component } from "react";
import Header from "../public/Header";
import HeadCatalog from "../public/HeadCatalog";
import MainHeadSlider from "./MainHeadSlider";
import ContentContainer from "./ContentContainer";
import Footer from "../public/Footer";
import PageCounter from "./PageCounter";

export default class MainPage extends Component{

    render() {
        return (
            <div>
                <Header/>
                <HeadCatalog/>
                <MainHeadSlider/>
                <ContentContainer/>
                <PageCounter/>
                <Footer />
            </div>
        )
    }
}

