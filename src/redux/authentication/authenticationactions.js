import axios from 'axios'
import { AUTHENTICATE_USER, AUTHENTICATE_USER_FAILURE, AUTHENTICATE_USER_SUCCESS, LOGOUT_USER } from './authenticationtypes'
import { authenticateUserUrl, generateNewTokenUrl, generateSessionIdUrl } from '../endpoints'
import { saveState } from '../localstorage'
// import store from '../store'

export const authenticateUser = () => {
    return {
        type: AUTHENTICATE_USER,
    }
}

export const authenticateUserSuccess = authResponse => {
    return {
        type: AUTHENTICATE_USER_SUCCESS,
        payload: authResponse
    }
}

export const authenticateUserFailure = authResponse => {
    return {
        type: AUTHENTICATE_USER_FAILURE,
        payload: authResponse
    }
}

export const logoutUser = (authResponse) => {
    return {
        type: LOGOUT_USER,
        payload: authResponse
    }
}

export const logoutAfterExpiration = (timer) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logoutUser());
            localStorage.clear()
        }, timer);
    }
}

export const validateUser = (username = null, password = null) => {
    console.log(username, password);
    return (dispatch) => {
        dispatch(authenticateUser())
        return axios.get(generateNewTokenUrl())
            .then(response => {
                const body = {
                    "username": username,
                    "password": password,
                    "request_token": response.data.request_token
                }
                return axios.post(authenticateUserUrl(), body)
            })
            .then(res => {
                return axios.post(generateSessionIdUrl(), { 'request_token': res.data.request_token }).then(session => {
                    const response = {
                        "username": username,
                        "request_token": res.data.request_token,
                        "expires_at": res.data.expires_at,
                        "session_id": session.data.session_id,
                        "success": true,
                        'redirectTo': '/'
                    }
                    saveState(response);
                    dispatch(authenticateUserSuccess(response));
                    // let time = new Date(res.data.expires_at).getTime();
                })
            }).catch(err => {
                console.log('Auth error : ', err.response.data);
                dispatch(authenticateUserFailure(err.response.data))
            })
    }
}

export const logoutUserFromApp = () => {
    return dispatch => {
        const payload = {
            isLoggedOut: true,
            redirectTo: '/'
        }
        dispatch(logoutUser(payload));
        localStorage.clear();
    }
}