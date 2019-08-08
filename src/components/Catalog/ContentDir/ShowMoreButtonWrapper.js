import React, {Component, Fragment} from 'react'
import CatalogStore from "../../../stores/CatalogStore";
import ShowMoreButton from "./ShowMoreButton";
import {toJS} from "mobx";
import {observer} from "mobx-react";

@observer
export default class ShowMoreButtonWrapper extends Component{
    render(){
        let isMore = CatalogStore.isMoreDataThanLimit;

        /*let startFrom = CatalogStore.startFrom;
        let startFromJS = toJS(startFrom);

        console.log(CatalogStore.productsCount - (startFromJS));*/

        return(
            <Fragment>
                {toJS(isMore) ? <ShowMoreButton/> : ""}
            </Fragment>
        )
    }
}