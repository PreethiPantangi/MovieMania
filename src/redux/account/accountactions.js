import axios from 'axios'
import { postFavouriteShowUrl } from '../endpoints'
import { POST_FAVOURITE_SHOW } from './accounttypes'
import { getUserDetails } from '../Profile/profileactions'

export const postFavouriteShow = (response) => {
    return {
        type: POST_FAVOURITE_SHOW,
        payload: response
    }
}

export const postFavShow = (type, showId, isFav) => {
    const body = {
        "media_type": type,
        "media_id": showId,
        "favorite": isFav
    }
    let session_id;
    if (localStorage.getItem('auth_info')) {
        if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser) {
            if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse) {
                session_id = JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse.session_id
                // username = JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse.username

            }
        }
    }
    return dispatch => {
        return axios.post(postFavouriteShowUrl(session_id), body).then(res => {
            let response = {
                ...res.data,
                'showId': showId
            }
            dispatch(postFavouriteShow(response));
            dispatch(getUserDetails())
        })
    }
}