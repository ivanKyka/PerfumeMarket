import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Header from "./Header";
import MainHeadSlider from "./MainHeadSlider";

class App extends Component {
    render() {
       console.log(this.a);
        return (
            <div>
                <MainTopBar/>
                <Header/>
                <MainHeadSlider/>
            </div>
        );
    }
}

export default App;