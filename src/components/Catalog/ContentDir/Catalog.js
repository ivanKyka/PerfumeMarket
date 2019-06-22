import React, {Fragment} from 'react';
import Footer from "../../public/Footer";
import Header from "../../public/Header";
import FilterComponentContainer from "../FilterComponentContainer";


export default class Catalog extends React.Component {

    render() {
        return(
        <Fragment>
            <Header/>
            <FilterComponentContainer CategoryID={this.props.match.params.id}/>
            <Footer/>
        </Fragment>
        )
    }
}
