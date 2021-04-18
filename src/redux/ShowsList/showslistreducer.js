import { GET_SHOWS_LIST } from './showslisttype'

const initialShowsList = {
    loading: false,
    shows: {}
}

const showsListReducer = (state = initialShowsList, action) => {
    switch (action.type) {
        case GET_SHOWS_LIST:
            return {
                loading: false,
                shows: action.payload
            }
        default:
            return state;
    }
}

export default showsListReducer