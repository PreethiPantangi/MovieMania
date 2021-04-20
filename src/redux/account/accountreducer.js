import { POST_FAVOURITE_SHOW, POST_FAVOURITE_SHOW_REQUEST, POST_MOVIE_TO_WATCHLIST, POST_MOVIE_TO_WATCHLIST_REQUEST } from './accounttypes'

const initialState = {
    loadingFavShow: false,
    responseFavShow: {},
    loadingFavWatchlist: false,
    responseWatchlistShow: {}
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_FAVOURITE_SHOW_REQUEST:
            return {
                ...state,
                loadingFavShow: true
            }
        case POST_FAVOURITE_SHOW:
            return {
                ...state,
                loadingFavShow: false,
                responseFavShow: action.payload
            }
        case POST_MOVIE_TO_WATCHLIST_REQUEST:
            return {
                ...state,
                loadingFavWatchlist: true,
            }
        case POST_MOVIE_TO_WATCHLIST:
            return {
                ...state,
                loadingFavWatchlist: false,
                responseWatchlistShow: action.payload
            }
        default:
            return state;
    }
}

export default accountReducer