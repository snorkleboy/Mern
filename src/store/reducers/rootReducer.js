import { combineReducers } from 'redux';
import StockReducer from './stocks/stockReducer';
export default combineReducers({
    stocks: StockReducer
});