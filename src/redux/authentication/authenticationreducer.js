import { AUTHENTICATE_USER, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE, LOGOUT_USER } from './authenticationtypes'

const initialLoginState = {
    loading: false,
    authResponse: {}
}

const loginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                loading: true
            }
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                authResponse: action.payload,
            }
        case AUTHENTICATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                authResponse: action.payload
            }
        case LOGOUT_USER:
            return {
                loading: false,
                authResponse: action.payload,
            }
        default:
            return state;
    }
}

export default loginReducer;