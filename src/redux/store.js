import { applyMiddleware, createStore } from 'redux'
import rootReducer from './rootreducer'
import thunk from 'redux-thunk'
import { loadState, saveState } from './localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistedState = loadState();


const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
    saveState(store.getState());
})

export default store;