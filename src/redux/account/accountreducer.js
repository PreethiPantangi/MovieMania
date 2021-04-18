import { POST_FAVOURITE_SHOW } from './accounttypes'

const initialState = {
    loading: false,
    response: {}
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_FAVOURITE_SHOW:
            return {
                loading: false,
                response: action.payload
            }
        default:
            return state;
    }
}

export default accountReducer