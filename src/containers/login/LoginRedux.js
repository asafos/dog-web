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
    getUserFailed: null,
    login: ['email', 'password'],
    loginSucceeded: null,
    loginFailed: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: true,
    user: {}
};

/* ------------- Reducers ------------- */

// const googleLogin = (state, {}) => ({...state, ...payload, initiated});
const getUser = (state, {user}) => ({...state, user, });
const login = (state, {user}) => ({...state, user, fetching: false});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    // [Types.GOOGLE_LOGIN]: googleLogin,
    // [Types.GET_USER_FAILED]: getUser,
    // [Types.GET_USER_SUCCEEDED]: getUser,
    [Types.LOGIN_SUCCEEDED]: login,
});
