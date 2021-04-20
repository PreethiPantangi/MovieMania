import axios from 'axios'
import { GET_FAVOURITE_MOVIES, PROFILE_GET_DETAILS, GET_FAVOURITE_TVS, PROFILE_GET_DETAILS_REQUEST, GET_FAVOURITE_MOVIES_REQUEST, GET_FAVOURITE_TVS_REQUEST } from './profiletypes'
import { getFavouriteShowUrl, getUserDetailsUrl } from '../endpoints'
import { getSessionId } from '../localstorage'



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

export const getProfileDetailsRequest = () => {
    return {
        type: PROFILE_GET_DETAILS_REQUEST
    }
}

export const getFavouriteMoviesRequest = () => {
    return {
        type: GET_FAVOURITE_MOVIES_REQUEST
    }
}

export const getFavouriteTvShowsRequest = () => {
    return {
        type: GET_FAVOURITE_TVS_REQUEST
    }
}



export const getUserDetails = () => {
    // let session_id;
    // if (localStorage.getItem('auth_info')) {
    //     if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser) {
    //         if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse) {
    //             session_id = JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse.session_id
    //         }
    //     }
    // }
    return dispatch => {
        dispatch(getProfileDetailsRequest())
        return axios.get(getUserDetailsUrl(getSessionId()))
            .then(profile => {
                localStorage.setItem('account_id', profile.data.id);

                dispatch(getProfileDetails(profile.data));
                getFavMovies();
                getFavTvShows()
                // return axios.get(getFavouriteShowUrl(session_id, 'movies'))
                //     .then(favMovies => {
                //         dispatch(getFavouriteTvShowsRequest())
                //         return axios.get(getFavouriteShowUrl(session_id, 'tv'))
                //             .then(tvShows => {
                //                 dispatch(getProfileDetails(profile.data));
                //                 dispatch(getFavouriteMovies(favMovies.data))
                //                 dispatch(getFavouriteTvShows(tvShows.data));
                //             })
                //             .catch(err => {
                //                 console.log(err);
                //             })
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const getFavMovies = () => {
    return dispatch => {
        dispatch(getFavouriteMoviesRequest());
        return axios.get(getFavouriteShowUrl(getSessionId(), 'movies'))
            .then(favMovies => {
                dispatch(getFavouriteMovies(favMovies.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getFavTvShows = () => {
    return dispatch => {
        dispatch(getFavouriteTvShowsRequest())
        return axios.get(getFavouriteShowUrl(getSessionId(), 'tv'))
            .then(tvShows => {
                dispatch(getFavouriteTvShows(tvShows.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}