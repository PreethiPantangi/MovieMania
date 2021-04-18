import axios from 'axios'
import { GET_FAVOURITE_MOVIES, PROFILE_GET_DETAILS, GET_FAVOURITE_TVS } from './profiletypes'
import { getFavouriteShowUrl, getUserDetailsUrl } from '../endpoints'



export const getProfileDetails = (userDetails) => {
    return {
        type: PROFILE_GET_DETAILS,
        payload: userDetails
    }
}

export const getFavouriteMovies = (favMovies) => {
    return {
        type: GET_FAVOURITE_MOVIES,
        payload: favMovies
    }
}

export const getFavouriteTvShows = (favTvShows) => {
    return {
        type: GET_FAVOURITE_TVS,
        payload: favTvShows
    }
}

export const getUserDetails = () => {
    let session_id;
    if (localStorage.getItem('auth_info')) {
        if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser) {
            if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse) {
                session_id = JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse.session_id
            }
        }
    }
    return dispatch => {
        return axios.get(getUserDetailsUrl(session_id))
            .then(profile => {
                localStorage.setItem('account_id', profile.data.id);
                return axios.get(getFavouriteShowUrl(session_id, 'movies'))
                    .then(favMovies => {
                        return axios.get(getFavouriteShowUrl(session_id, 'tv'))
                            .then(tvShows => {
                                dispatch(getProfileDetails(profile.data));
                                dispatch(getFavouriteMovies(favMovies.data))
                                dispatch(getFavouriteTvShows(tvShows.data));
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}
