import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Header from "./Header";
import MainHeadSlider from "./MainHeadSlider";
import ContentContainer from "./ContentContainer";

class App extends Component {
    render() {
        return (
            <div>
                <MainTopBar/>
                <Header/>
                <MainHeadSlider/>
                <ContentContainer/>
            </div>
        );
    }
}

export default App;