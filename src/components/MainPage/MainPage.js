import React, { Component } from "react";
import Header from "../public/Header";
import HeadCatalog from "../public/HeadCatalog";
import MainHeadSlider from "./MainHeadSlider";
import Footer from "../public/Footer";
import Categories from "./Categories";
import Banner from "./Banner";
import BlogRefs from "./BlogRefs";
import MetaTags from "react-meta-tags";
import Recomendations from "../public/Recomendations";

export default class MainPage extends Component{

    render() {
        return (
            <div>
                <MetaTags>
                    <title>Profumo</title>
                </MetaTags>
                <Header/>
                <HeadCatalog/>
                <MainHeadSlider/>
                <Categories/>
                <Banner/>
                <Recomendations/>
                <BlogRefs/>
                <Footer/>
            </div>
        )
    }
}

//<Categories/>