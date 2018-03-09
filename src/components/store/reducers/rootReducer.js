import { combineReducers } from 'redux';
import StockReducer from './stocks/stockReducer';
import UserReducer from './user/userReducer';
export default combineReducers({
    stocks: StockReducer,
    user:UserReducer
});