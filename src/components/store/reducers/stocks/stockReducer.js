import {
    RECEIVE_STOCKS,
    RECEIVE_STOCKS_LIST
} from '../../../stocks/stockActions';
import merge from 'lodash/merge';

export const _stocks = {
    lists:{
        gainers: [],
        losers: [],
        mostActive: [],
        mostVolume: []
    }
    
};

export default (state = _stocks, action)=>{
    Object.freeze(state);
    var newstate = {};
    switch (action.type) {
        case RECEIVE_STOCKS:
            newstate = merge({}, state, action.payload);
            return newstate; 
        case RECEIVE_STOCKS_LIST:
            newstate = merge({}, state, {lists:action.payload})
            return newstate;
        default:
            return state;
    }
};