import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getStoryByStoryId: ['storyId'],
    getStoryByStoryIdSucceeded: ['story'],
    getStoryByStoryIdFailed: ['error'],
    getStoriesByUserId: null,
    getStoriesByUserIdSucceeded: ['stories'],
    getStoriesByUserIdFailed: ['error'],
    getAllPublicStories: null,
    getAllPublicStoriesSucceeded: ['stories'],
    getAllPublicStoriesFailed: ['error'],
    saveStory: ['story'],
    saveStorySucceeded: null,
    saveStoryFailed: ['error'],
    updateStory: ['story', 'apply'],
    updateStorySucceeded: null,
    updateStoryFailed: ['error'],
    removeStory: ['storyId'],
    removeStorySucceeded: ['stories'],
    removeStoryFailed: ['error'],
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
const getAllPublicStoriesSucceeded = (state, {stories}) => ({...state, content: stories, fetching: false});
const getAllPublicStoriesFailed = (state, {}) => ({...state, fetching: false});
const saveStorySucceeded = (state, {}) => ({...state, fetching: false});
const saveStoryFailed = (state, {}) => ({...state, fetching: false});
const updateStorySucceeded = (state, {}) => ({...state, fetching: false});
const updateStoryFailed = (state, {}) => ({...state, fetching: false});
const removeStorySucceeded = (state, {stories}) => ({...state, fetching: false, content: stories});
const removeStoryFailed = (state, {}) => ({...state, fetching: false});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_STORIES_BY_USER_ID]: startAsyncReq,
    [Types.GET_STORY_BY_STORY_ID]: startAsyncReq,
    [Types.GET_ALL_PUBLIC_STORIES]: startAsyncReq,
    [Types.SAVE_STORY]: startAsyncReq,
    [Types.UPDATE_STORY]: startAsyncReq,
    [Types.REMOVE_STORY]: startAsyncReq,
    [Types.GET_STORIES_BY_USER_ID_SUCCEEDED]: getStoriesByUserIdSucceeded,
    [Types.GET_STORIES_BY_USER_ID_FAILED]: getStoriesByUserIdFailed,
    [Types.GET_STORY_BY_STORY_ID_SUCCEEDED]: getStoryByStoryIdSucceeded,
    [Types.GET_STORY_BY_STORY_ID_FAILED]: getStoryByStoryIdFailed,
    [Types.GET_ALL_PUBLIC_STORIES_SUCCEEDED]: getAllPublicStoriesSucceeded,
    [Types.GET_ALL_PUBLIC_STORIES_FAILED]: getAllPublicStoriesFailed,
    [Types.SAVE_STORY_SUCCEEDED]: saveStorySucceeded,
    [Types.SAVE_STORY_FAILED]: saveStoryFailed,
    [Types.UPDATE_STORY_SUCCEEDED]: updateStorySucceeded,
    [Types.UPDATE_STORY_FAILED]: updateStoryFailed,
    [Types.REMOVE_STORY_SUCCEEDED]: removeStorySucceeded,
    [Types.REMOVE_STORY_FAILED]: removeStoryFailed,
});
