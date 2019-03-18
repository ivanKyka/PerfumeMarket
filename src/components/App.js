import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Footer from "./Footer";

class App extends Component {
    render() {
       console.log(this.a);
        return (
            <div>
            <MainTopBar/>
                <br/>
            <Footer />
            </div>
        );
    }
}

export default App;