import { combineReducers } from "redux";
import loginReducer from "./authentication/authenticationreducer";
import profileReducer from './Profile/profilereducer';
import showsListReducer from './ShowsList/showslistreducer'
import accountReducer from './account/accountreducer'

const rootreducer = combineReducers({
    authenticateUser: loginReducer,
    profile: profileReducer,
    shows: showsListReducer,
    account: accountReducer
})

export default rootreducer