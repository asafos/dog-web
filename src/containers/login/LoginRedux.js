import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    googleLogin: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    loggedIn: false,
    user: {}
};

/* ------------- Reducers ------------- */

// const googleLogin = (state, {}) => ({...state, ...payload, initiated});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    // [Types.GOOGLE_LOGIN]: googleLogin,
});
