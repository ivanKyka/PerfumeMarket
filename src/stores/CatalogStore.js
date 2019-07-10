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
        name_ru_contains: null,
        desc_contains: null
    };

    searchRequestForSearchMode = null;

    @observable
    sortOption = 'price:asc';

    @observable
    category = {
        _id : null
    };

    limit = 18;
    searchMode = false;

    @observable
    isMoreDataThanLimit = false;
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
        filtersCopy.name_ru_contains = searchRequest;
        filtersCopy.desc_contains = searchRequest;
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
    setFiltersFromLeftBar = (filter) => {
        let filtersCopy = {...this.filters};

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

        filtersCopy = {...filtersCopy, ...filters, desc_contains: filters.name_ru_contains};
        this.filters = filtersCopy;

        this.refetch();
    };

    @action
    clearFiltersFormTopBar = () => {
        let filtersCopy = {...this.filters};

        filtersCopy.price_lte = null;
        filtersCopy.price_gte = null;

        if (!this.searchMode) {
            filtersCopy.name_ru_contains = null;
            filtersCopy.desc_contains = null;
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

        console.log(values);
        return values;
    }
}

export default new CatalogStore();