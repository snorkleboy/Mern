import {RECEIVE_STOCKS} from '../../../components/stocks/stockActions';
import merge from 'lodash/merge';

const _stocks = {
    byId:{},
    ids:[]
};

export default (state = _stocks, action)=>{
    Object.freeze(state);
    var newstate = {};
    switch (action.type) {
        case RECEIVE_STOCKS:
            newstate = merge({}, state, action.payload);
            return newstate; 
        default:
            return state;
    }
};