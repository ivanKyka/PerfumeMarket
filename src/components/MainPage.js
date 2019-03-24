import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Header from "./Header";
import MainHeadSlider from "./MainHeadSlider";
import ContentContainer from "./ContentContainer";
import Footer from "./Footer";
import PageCounter from "./PageCounter";

export default class MainPage extends Component{

    render() {
        return (
            <div>
                <MainTopBar/>
                <Header/>
                <MainHeadSlider/>
                <ContentContainer/>
                <PageCounter/>
                <Footer />
            </div>
        )
    }
}

