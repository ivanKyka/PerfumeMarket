import React, { Component } from "react";
import MainTopBar from "../public/MainTopBar";
import Header from "./Header";
import MainHeadSlider from "./MainHeadSlider";
import ContentContainer from "./ContentContainer";
import Footer from "../public/Footer";
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

