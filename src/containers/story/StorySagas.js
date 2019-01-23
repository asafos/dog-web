import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {StoryTypes} from './StoryRedux';
import { push } from 'connected-react-router'
import NotificationCreators from '../../components/notification/NotificationRedux';
import StoryCreators from './StoryRedux';

const {getStoryByStoryIdSucceeded, getStoryByStoryIdFailed, getStoryByStoryId, getStoriesByUserIdSucceeded, getStoriesByUserIdFailed, saveStorySucceeded, saveStoryFailed} = StoryCreators;
const {showNotification} = NotificationCreators;

function* getStoryByStoryIdSaga(action) {
    try {
        const res = yield call(() => axios.get('/api/story/byStoryId/' + action.storyId));
        yield put(getStoryByStoryIdSucceeded(res.data.story));
    } catch (error) {
        yield put(getStoryByStoryIdFailed(error));
    }
}

function* getStoriesByUserIdSaga(action) {
    try {
        const res = yield call(() => axios.get('/api/story/byUserId/'));
        yield put(getStoriesByUserIdSucceeded(res.data.stories));
    } catch (error) {
        yield put(getStoriesByUserIdFailed(error));
    }
}

function* saveStorySaga(action) {
    try {
        const res = yield call(() => axios.post('/api/story', action.story));
        yield put(saveStorySucceeded());
        yield put(showNotification('Story saved'));
        yield put(getStoryByStoryId(res.data.story._id));
        yield put(push('/story/' + res.data.story._id));
    } catch (error) {
        yield put(saveStoryFailed(error));
    }
}

function* sagas() {
    yield all([
        takeLatest(StoryTypes.GET_STORIES_BY_USER_ID, getStoriesByUserIdSaga),
        takeLatest(StoryTypes.GET_STORY_BY_STORY_ID, getStoryByStoryIdSaga),
        takeLatest(StoryTypes.SAVE_STORY, saveStorySaga),
    ])
}

export default [sagas()];
