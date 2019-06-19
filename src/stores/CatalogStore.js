import {observable, action} from 'mobx'


class CatalogStore {
    @observable
    filters = {
        properties: {_id: []},
        category: {
            _id: null
        },
        price_lte: null,
        price_gte: null,
        _q : null
    };

    refetch = null;


    @action
    setFiltersFromLeftBar = (filter, isErasing) => {
        let filtersCopy = {...this.filters};

        if (isErasing) {
            filtersCopy.properties._id = filtersCopy.properties._id.filter(el => el !== filter);
            this.filters = filtersCopy;
            this.refetch();
            return;
        }

        this.refetch();
        filtersCopy.properties._id.push(filter);
        this.filters = filtersCopy;
    };

    @action
    setFiltersFromTopBar = (filters) => {
        let filterCopy = {...this.filters};

        filterCopy = {...filterCopy, ...filters};
        this.filters = filterCopy;

        this.refetch();
    };

    @action
    clearFiltersFromLeftBar = () => {
        this.filters = {
            properties: {_id: []},
            category: {
                _id: null
            }
        };

        this.refetch();
    };

    @action
    setID = (id) => {
        this.filters.category._id = id;
        this.refetch();
    }
}

export default new CatalogStore();