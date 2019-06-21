import {observable, action, toJS} from 'mobx'


class CatalogStore {
    @observable
    filters = {
        properties: {_id: []},
        category: {
            _id: []
        },
        price_lte: null,
        price_gte: null,
        _q: null
    };

    @observable
    sortOption = 'price:asc';

    @observable
    category = {
        _id : null
    };

    @observable
    limit = 30;

    refetch = null;
    refetchCategory = null;

    @action
    increaseLimit = () => {
        console.log("limit increased");
        this.limit += 30;

        this.refetch();
    };

    @action
    togglePrice = (priceState) => {
        if (!priceState) {
            this.sortOption = "price:desc";
        } else {
            this.sortOption = "price:asc";
        }

        this.refetch();
    };

    @action
    toggleRating = (ratingState) => {
        if (!ratingState) {
            this.sortOption = "rating:desc";
        } else {
            this.sortOption = "rating:asc";
        }

        this.refetch();
    };

    @action
    toggleNewest = (newestState) => {
        if (!newestState) {
            this.sortOption = "createdAt:desc";
        } else {
            this.sortOption = "createdAt:asc";
        }

        this.refetch();
    };

    @action
    setCategory = (category) => {
        let categoryCopy = {...this.category};

        categoryCopy._id = category;

        this.category = categoryCopy;

        /*if (this.refetchCategory)
            console.trace('REFETCHING');
            this.refetchCategory();*/
    };

    @action
    addCategoriesToFilters = (category) => {
        let filtersCopy = {...this.filters};

        if (typeof filtersCopy.category._id === "Object")
            filtersCopy.category._id = [];

        filtersCopy.category._id.push(category);
        this.filters = filtersCopy;

        this.refetch();
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