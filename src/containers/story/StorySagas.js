import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {StoryTypes} from './StoryRedux';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getStory(action) {
    try {
        const res = yield call(() => axios.get('/api/story/' + action.storyId));
        yield put({type: StoryTypes.GET_STORY_SUCCEEDED, story: res.data.story});
    } catch (error) {
        yield put({type: StoryTypes.GET_STORY_FAILED, error});
    }
}

function* saveStory({story}) {
    try {
        yield call(() => axios.post('/api/story', story));
        yield put({type: StoryTypes.SAVE_STORY_SUCCEEDED});
    } catch (error) {
        yield put({type: StoryTypes.SAVE_STORY_FAILED, error});
    }
}

function* sagas() {
    yield all([
        takeLatest(StoryTypes.GET_STORY, getStory),
        takeLatest(StoryTypes.SAVE_STORY, saveStory),
    ])
}

export default [sagas()];
