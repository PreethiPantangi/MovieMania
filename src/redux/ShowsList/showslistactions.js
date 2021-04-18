import { GET_SHOWS_LIST } from './showslisttype'
import { getShowsByGenreIdUrl } from '../endpoints'
import axios from 'axios'

export const getShowsList = (shows) => {
    return {
        type: GET_SHOWS_LIST,
        payload: shows
    }
}

export const getShows = (genreId) => {
    return (dispatch) => {
        return axios.get(getShowsByGenreIdUrl(genreId))
            .then(res => {
                dispatch(getShowsList(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}