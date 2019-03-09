import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    googleLogin: null,
    getUser: ['user'],
    getUserSucceeded: null,
    getUserFailed: null,
    signup: ['email', 'password'],
    signupSucceeded: null,
    signupFailed: null,
    login: ['email', 'password'],
    loginSucceeded: null,
    loginFailed: null,
    logout: null,
    logoutSucceeded: null,
    logoutFailed: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    user: null
};

/* ------------- Reducers ------------- */

// const googleLogin = (state, {}) => ({...state, ...payload, initiated});
const getUser = (state, {user}) => ({...state, user, fetching: false});
const login = (state, {user}) => ({...state, user, fetching: false});
const logout = (state) => ({...state, user: null, fetching: false});
const startFetch = (state) => ({...state, fetching: true});
const stopFetch = (state) => ({...state, fetching: false});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    // [Types.GOOGLE_LOGIN]: googleLogin,
    // [Types.GET_USER_FAILED]: getUser,
    // [Types.GET_USER_SUCCEEDED]: getUser,
    [Types.LOGIN]: startFetch,
    [Types.LOGOUT]: startFetch,
    [Types.GET_USER]: startFetch,
    [Types.LOGIN_SUCCEEDED]: login,
    [Types.LOGOUT_SUCCEEDED]: logout,
    [Types.GET_USER_SUCCEEDED]: getUser,
    [Types.LOGIN_FAILED]: stopFetch,
    [Types.LOGOUT_FAILED]: stopFetch,
    [Types.GET_USER_FAILED]: stopFetch,
});
