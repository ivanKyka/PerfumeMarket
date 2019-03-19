import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Header from "./Header";
import MainHeadSlider from "./MainHeadSlider";
import ContentContainer from "./ContentContainer";
import Footer from "./Footer";
import PageCounter from "./PageCounter";

class App extends Component {
    render() {
       console.log(this.a);
        return (
            <div>
                <MainTopBar/>
                <Header/>
                <MainHeadSlider/>
                <ContentContainer/>
                <PageCounter/>
                <Footer />
            </div>
        );
    }
}

export default App;