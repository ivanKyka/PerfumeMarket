import React, { Component } from "react";
import MainTopBar from "./MainTopBar";
import Header from "./Header";

class App extends Component {
    render() {
       console.log(this.a);
        return (
            <div>
                <MainTopBar/>
                <Header/>
            </div>
        );
    }
}

export default App;