import {observable, action} from 'mobx'


class CatalogStore {
    @observable
    filters = {
        properties: {_id: []},
        category: {
            _id: []
        },
        price_gte: null,
        price_lte: null,
        _q: null
    };

    searchRequestForSearchMode = null;

    @observable
    sortOption = 'price:asc';

    @observable
    category = {
        _id : null
    };

    limit = 20;
    searchMode = false;

    @observable
    isMoreDataThanLimit = false;

    @observable
    startFrom = 0;

    @observable
    productsCount = 0;

    refetch = null;
    refetchCategory = null;
    fetchMore = null;

    @action
    setRequestForSearchMode = (request) => {
        this.searchRequestForSearchMode = request;
    };

    @action
    checkIsMoreDataThan = (currentValue) => {
        this.isMoreDataThanLimit = this.productsCount > currentValue;
    };

    @action
    setSearchRequest = (searchRequest) => {
        let filtersCopy = {...this.filters};
        filtersCopy._q = searchRequest;
        this.searchRequestForSearchMode = searchRequest;
        this.searchMode = true;

        this.filters = filtersCopy;
        this.refetch();
    };

    @action
    increaseLimit = () => {
        this.fetchMore();
    };

    @action
    setStartFrom = (newStart) => {
        this.startFrom = newStart;

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

        if (this.refetchCategory)
            this.refetchCategory();
    };

    @action
    addCategoriesToFilters = (categories) => {
        let filtersCopy = {...this.filters};

        if (typeof filtersCopy.category._id === "Object")
            filtersCopy.category._id = [];

        if (Array.isArray(categories)){
            filtersCopy.category._id = categories;
        } else{
            filtersCopy.category._id.push(categories);
        }

        this.filters = filtersCopy;

        this.refetch();
    };

    @action
    setFiltersFromLeftBar = (filter) => {
        let filtersCopy = {...this.filters};

        this.startFrom = 0;

        if (filtersCopy.properties._id.includes(filter)) {
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

        this.startFrom = 0;

        filtersCopy = {...filtersCopy, ...filters, _q: filters._q};
        this.filters = filtersCopy;

        this.refetch();
    };

    @action
    clearFiltersFormTopBar = () => {
        let filtersCopy = {...this.filters};

        this.startFrom = 0;

        filtersCopy.price_lte = null;
        filtersCopy.price_gte = null;

        if (!this.searchMode) {
            filtersCopy._q = null;
        }

        this.filters = {...this.filters, ...filtersCopy};

        this.refetch();
    };

    @action
    setID = (id) => {
        this.filters.category._id = id;
        this.refetch();
    };

    getParametresFromURL = (string) => {
        let url = new URL(string);
        let parametresString = url.search.substring(1);

        let values = [];

        let vars = parametresString.split('&');

        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            values.push(decodeURIComponent(pair[1]));
        }

        return values;
    }
}

export default new CatalogStore();