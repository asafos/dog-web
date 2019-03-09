import {createReducer, createActions, resettableReducer} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    showNotification: ['message', 'error'],
    hideNotification: null,
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    open: false,
    message: '',
    variant: ''
};

/* ------------- Reducers ------------- */

const showNotification = (state, {message, error}) => ({...state, open: true, message, variant: error ? 'error' : 'success', error});
const hideNotification = (state, {}) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SHOW_NOTIFICATION]: showNotification,
    [Types.HIDE_NOTIFICATION]: hideNotification
});
