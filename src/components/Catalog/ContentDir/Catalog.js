import React, {Fragment} from 'react';
import Footer from "../../public/Footer";
import Header from "../../public/Header";
import HeadCatalog from "../../public/HeadCatalog";
import FilterComponentContainer from "../FilterComponentContainer";


export default class Catalog extends React.Component {

render() {
    return(
        <Fragment>
            <Header/>
            <HeadCatalog/>
            <FilterComponentContainer/>
            <Footer/>
        </Fragment>
        )
    }
}
