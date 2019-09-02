import React, { Component } from "react";
import Header from "../public/Header";
import HeadCatalog from "../public/HeadCatalog";
import MainHeadSlider from "./MainHeadSlider";
import Footer from "../public/Footer";
import Categories from "./Categories";
import Banner from "./Banner";
import BlogRefs from "./BlogRefs";

export default class MainPage extends Component{

    render() {
        return (
            <div>
                <Header/>
                <HeadCatalog/>
                <MainHeadSlider/>

                <Banner/>
                <BlogRefs/>
                <Footer/>
            </div>
        )
    }
}

//<Categories/>