import React, {Component} from 'react'
import CatalogStore from "../../../../stores/CatalogStore";
import {client} from "../../../App";
import {observer} from "mobx-react";
import Pagination from 'react-paginate'
import './PaginationStyle.css'
import {toJS} from "mobx";

@observer
export default class PaginationComponent extends Component {
    activePage = toJS(CatalogStore.startFrom) / CatalogStore.limit;

    changeHandled = (pageNumber) => {
        client.resetStore().then(val => {
            CatalogStore.setStartFrom(pageNumber.selected * CatalogStore.limit);
            window.scrollTo(0, 0);
        });
    };

    render() {

        return (
            <Pagination
                pageCount={Math.ceil(CatalogStore.productsCount / CatalogStore.limit)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                initialPage={this.activePage}
                containerClassName={'pagination'}
                disableInitialCallback={true}
                onPageChange={this.changeHandled}
            />

        )
    }
}