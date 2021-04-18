import { GET_FAVOURITE_MOVIES, GET_FAVOURITE_TVS, PROFILE_GET_DETAILS } from './profiletypes'

const initialProfileState = {
    loading: false,
    profile: {},
    favMovies: {},
    tvShows: {}
}

const profileReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case PROFILE_GET_DETAILS:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case GET_FAVOURITE_MOVIES:
            return {
                ...state,
                loading: false,
                favMovies: action.payload
            }
        case GET_FAVOURITE_TVS:
            return {
                ...state,
                loading: false,
                tvShows: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;