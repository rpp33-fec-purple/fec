import {combineReducers} from 'redux';
import currentProduct from './overview.js';
import qA from './qa.js';
import relatedItems from './relatedItems.js';
import reviews from './reviews.js';

//import all other reducers and insert into rootReducer

const rootReducer = combineReducers({
  currentProduct,
  qA,
  relatedItems,
  reviews
});


export default rootReducer;