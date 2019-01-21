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

const resettable = resettableReducer(Types.HIDE_NOTIFICATION)
const showNotification = (state, {message, error}) => ({...state, open: true, message, variant: error ? 'error' : 'success'});
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SHOW_NOTIFICATION]: resettable(showNotification),
});
