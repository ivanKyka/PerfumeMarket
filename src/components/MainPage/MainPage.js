import React, { Component } from "react";
import Header from "../public/Header";
import HeadCatalog from "../public/HeadCatalog";
import MainHeadSlider from "./MainHeadSlider";
import Footer from "../public/Footer";

export default class MainPage extends Component{

    render() {
        return (
            <div>
                <Header/>
                <HeadCatalog/>
                <MainHeadSlider/>
                <Footer />
            </div>
        )
    }
}

