import {
    RECIEVE_USER,
    RECIEVE_USER_ERROR
} from '../../../composed/user/userActions';
import merge from 'lodash/merge';

const _user = {
    errors:{},
    user:null,
};

export default (state = _user, action) => {
    Object.freeze(state);
    var newstate = {};
    switch (action.type) {
        case RECIEVE_USER:
            newstate = merge({}, state, {user:action.payload});
            return newstate;
        case RECIEVE_USER_ERROR:
            newstate = merge({}, state, { errors: action.payload })
            return newstate;
        default:
            return state;
    }
};