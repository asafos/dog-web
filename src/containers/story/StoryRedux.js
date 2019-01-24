import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getStoryByStoryId: ['storyId'],
    getStoryByStoryIdSucceeded: ['story'],
    getStoryByStoryIdFailed: ['error'],
    getStoriesByUserId: null,
    getStoriesByUserIdSucceeded: ['stories'],
    getStoriesByUserIdFailed: ['error'],
    saveStory: ['story'],
    saveStorySucceeded: null,
    saveStoryFailed: ['error'],
});

export const StoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    content: [],
    currentStory: {
        content: {}
    }
};

/* ------------- Reducers ------------- */

const startAsyncReq = (state, {}) => ({...state, fetching: true});
const getStoryByStoryIdSucceeded = (state, {story}) => ({...state, currentStory: story, fetching: false});
const getStoryByStoryIdFailed = (state, {}) => ({...state, fetching: false});
const getStoriesByUserIdSucceeded = (state, {stories}) => ({...state, content: stories, fetching: false});
const getStoriesByUserIdFailed = (state, {}) => ({...state, fetching: false});
const saveStorySucceeded = (state, {}) => ({...state, fetching: false});
const saveStoryFailed = (state, {}) => ({...state, fetching: false});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_STORIES_BY_USER_ID]: startAsyncReq,
    [Types.GET_STORY_BY_STORY_ID]: startAsyncReq,
    [Types.SAVE_STORY]: startAsyncReq,
    [Types.GET_STORIES_BY_USER_ID_SUCCEEDED]: getStoriesByUserIdSucceeded,
    [Types.GET_STORIES_BY_USER_ID_FAILED]: getStoriesByUserIdFailed,
    [Types.GET_STORY_BY_STORY_ID_SUCCEEDED]: getStoryByStoryIdSucceeded,
    [Types.GET_STORY_BY_STORY_ID_FAILED]: getStoryByStoryIdFailed,
    [Types.SAVE_STORY_SUCCEEDED]: saveStorySucceeded,
    [Types.SAVE_STORY_FAILED]: saveStoryFailed,
});
