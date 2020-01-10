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
import ReactGA from 'react-ga';
import {WebpMachine} from "webp-hero";

export default class MainPage extends Component{

componentWillMount() {
    ReactGA.pageview(location.pathname);
}
    componentDidMount() {
        const webpMachine = new WebpMachine();
        console.log(webpMachine);
        webpMachine.polyfillDocument()
    }

    render() {
        window.scrollTo(0,0);
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