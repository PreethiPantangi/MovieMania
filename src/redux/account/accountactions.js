import axios from 'axios'
import { postFavouriteShowUrl, postShowToWatchlistUrl } from '../endpoints'
import { POST_FAVOURITE_SHOW, POST_FAVOURITE_SHOW_REQUEST, POST_MOVIE_TO_WATCHLIST, POST_MOVIE_TO_WATCHLIST_REQUEST } from './accounttypes'
import { getFavMovies, getFavTvShows } from '../Profile/profileactions'
import { getSessionId } from '../localstorage'

export const postFavouriteShow = (response) => {
    return {
        type: POST_FAVOURITE_SHOW,
        payload: response
    }
}

export const postFavouriteShowRequest = () => {
    return {
        type: POST_FAVOURITE_SHOW_REQUEST
    }
}

export const postShowToWatchList = (response) => {
    return {
        type: POST_MOVIE_TO_WATCHLIST,
        payload: response
    }
}

export const postShowToWatchListRequest = () => {
    return {
        type: POST_MOVIE_TO_WATCHLIST_REQUEST
    }
}

export const postFavShow = (type, showId, isFav) => {
    const body = {
        "media_type": type,
        "media_id": showId,
        "favorite": isFav
    }
    return dispatch => {
        dispatch(postFavouriteShowRequest())
        return axios.post(postFavouriteShowUrl(getSessionId()), body).then(res => {
            let response = {
                ...res.data,
                'showId': showId
            }
            dispatch(postFavouriteShow(response));
            dispatch(getFavMovies());
            dispatch(getFavTvShows());
        })
    }
}

export const postMovieToWatchList = (type, showId, isFav) => {
    const body = {
        "media_type": type,
        "media_id": showId,
        "watchlist": isFav
    }
    return dispatch => {
        dispatch(postShowToWatchListRequest())
        return axios.post(postShowToWatchlistUrl(getSessionId()), body).then(res => {
            let response = {
                ...res.data,
                'showId': showId
            }
            dispatch(postShowToWatchList(response));
            dispatch(getFavMovies());
            dispatch(getFavTvShows());
        })
    }
}