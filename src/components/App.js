import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Header from "./Header";
import MainHeadSlider from "./MainHeadSlider";
import ContentContainer from "./ContentContainer";
import Footer from "./Footer";

class App extends Component {
    render() {
       console.log(this.a);
        return (
            <div>
                <MainTopBar/>
                <Header/>
                <MainHeadSlider/>
                <ContentContainer/>
                <Footer />
            </div>
        );
    }
}

export default App;