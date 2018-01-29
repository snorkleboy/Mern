// import {
//     RECEIVE_ALL_EVENTS,
//     RECEIVE_EVENT,
//     RECEIVE_CREATED_EVENT,
//     DELETE_REGISTRATION,
//     DELETE_BOOKMARKS,
//     RECEIVE_REGISTRATION,
//     RECEIVE_BOOKMARKS
// } from '../../actions/event_actions';

import merge from 'lodash/merge';

const _stocks = {
    byId:{},
    ids:[]
};

export default (state = _stocks, action)=>{
    Object.freeze(state);
    var newstate = {};
    switch (action.type) {
        default:
            return state;
    }
};