import {observable, action, toJS} from 'mobx'


class CatalogStore {
    @observable
    filters = {
        properties: {_id: []},
        category: {
            _id: null
        },
        price_lte: null,
        price_gte: null,
        _q: null
    };

    refetch = null;
    refetchCategories = null;

    @action
    setCategory = (category) => {
        let filtersCopy = {...this.filters};

        filtersCopy.category._id = category;

        this.filters = filtersCopy;

        console.trace(toJS(this.filters));
        this.refetch();

        if (this.refetchCategories)
            this.refetchCategories();
    };

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
        let filtersCopy = {...this.filters};

        filtersCopy = {...filtersCopy, ...filters};
        this.filters = filtersCopy;

        this.refetch();
    };

    /*@action
    clearFiltersFromLeftBar = () => {
        this.filters = {
            properties: {_id: []},
            category: {
                _id: null
            }
        };

        this.refetch();
    };*/

    @action
    clearFiltersFormTopBar = () => {
        let filtersCopy = {...this.filters};

        filtersCopy.price_lte = null;
        filtersCopy.price_gte = null;
        filtersCopy._q = null;

        this.filters = {...this.filters, ...filtersCopy};

        this.refetch();
    };

    @action
    setID = (id) => {
        this.filters.category._id = id;
        this.refetch();
    }
}

export default new CatalogStore();