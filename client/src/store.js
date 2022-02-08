import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/main.js';

const initialState = {};
//This should eventually initialize as product 1

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));


export default store;


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, initialState, composeEnhancers(applyMiddleWare(thunk));
// export default store;