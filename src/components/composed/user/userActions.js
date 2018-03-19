import * as UserAPI from '../../../util/UserAPI'

export const RECIEVE_USER = "RECIEVE_USER";
export const RECIEVE_USER_ERROR = "RECIEVE_USER_ERROR";

export const receiveUser = (user) => ({
    type: RECIEVE_USER,
    payload: user
});

export const receiveUserError = (err) => ({
    type: RECIEVE_USER_ERROR,
    payload: err
});

export const login = (username, password) => dispatch => UserAPI.login(username, password)
    .then((res) => !res.error ? dispatch(receiveUser({username})) : dispatch(receiveUserError(res)))
    .catch((fail) => dispatch(receiveUserError(fail)))

export const logout = () => dispatch => UserAPI.logout()
    .then((res) => dispatch(receiveUser(res)), (fail) => dispatch(receiveUserError(fail)))
    .catch((fail) => dispatch(receiveUserError(fail)))

export const createUser = (username, password) => dispatch => UserAPI.createUser(username, password)
    .then((res) => !res.error ? dispatch(receiveUser({ username })) : dispatch(receiveUserError(res)))
    .catch((fail) => dispatch(receiveUserError(fail)))

export const checkUserName = UserAPI.checkUserName;