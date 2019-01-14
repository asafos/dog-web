import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    setProps: ['payload', 'initiated'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    initiated: false
};

/* ------------- Reducers ------------- */

const setProps = (state, {payload, initiated}) => ({...state, ...payload, initiated});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_PROPS]: setProps,
});
