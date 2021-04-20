import { combineReducers } from "redux";
import loginReducer from "./authentication/authenticationreducer";
import profileReducer from './Profile/profilereducer';
import accountReducer from './account/accountreducer'

const rootreducer = combineReducers({
    authenticateUser: loginReducer,
    profile: profileReducer,
    account: accountReducer
})

export default rootreducer