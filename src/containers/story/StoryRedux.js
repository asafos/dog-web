import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getStory: ['storyId'],
    getStorySucceeded: ['story'],
    getStoryFailed: ['error'],
    saveStory: ['story'],
    saveStorySucceeded: null,
    saveStoryFailed: ['error'],
});

export const StoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false
};

/* ------------- Reducers ------------- */

const startAsyncReq = (state, {}) => ({...state, fetching: true});
const getStorySucceeded = (state, {story}) => ({...state, ...story, fetching: false});
const saveStorySucceeded = (state, {}) => ({...state, fetching: false});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_STORY]: startAsyncReq,
    [Types.SAVE_STORY]: startAsyncReq,
    [Types.GET_STORY_SUCCEEDED]: getStorySucceeded,
    [Types.SAVE_STORY_SUCCEEDED]: saveStorySucceeded,
});
