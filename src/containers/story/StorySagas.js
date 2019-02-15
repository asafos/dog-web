import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { StoryTypes } from './StoryRedux';
import { push } from 'connected-react-router'
import NotificationCreators from '../../components/notification/NotificationRedux';
import StoryCreators from './StoryRedux';

const {
    getStoryByStoryIdSucceeded,
    getStoryByStoryIdFailed,
    getStoriesByUserIdSucceeded,
    getStoriesByUserIdFailed,
    getAllPublicStoriesSucceeded,
    getAllPublicStoriesFailed,
    saveStorySucceeded,
    saveStoryFailed,
    updateStorySucceeded,
    updateStoryFailed,
    removeStorySucceeded,
    removeStoryFailed,
} = StoryCreators;
const { showNotification } = NotificationCreators;

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

function* getAllPublicStoriesSaga(action) {
    try {
        const res = yield call(() => axios.get('/api/story/allPublic'));
        yield put(getAllPublicStoriesSucceeded(res.data.stories));
    } catch (error) {
        yield put(getAllPublicStoriesFailed(error));
    }
}

function* saveStorySaga(action) {
    try {
        const res = yield call(() => axios.post('/api/story', action.story));
        yield put(saveStorySucceeded());
        yield put(showNotification('Story saved'));
        yield put(push('/story/' + res.data.story._id));
    } catch (error) {
        yield put(saveStoryFailed(error));
    }
}

function* updateStorySaga(action) {
    try {
        yield call(() => axios.put('/api/story', action.story));
        yield put(updateStorySucceeded());
        yield put(showNotification('Story saved'));
        yield put(push('/story/' + action.story._id));
    } catch (error) {
        yield put(updateStoryFailed(error));
    }
}

function* removeStorySaga(action) {
    try {
        const res = yield call(() => axios.delete('/api/story/' + action.storyId));
        yield put(removeStorySucceeded(res.data.stories));
        yield put(showNotification('Story deleted'));
    } catch (error) {
        yield put(removeStoryFailed(error));
    }
}

function* sagas() {
    yield all([
        takeLatest(StoryTypes.REMOVE_STORY, removeStorySaga),
        takeLatest(StoryTypes.GET_STORIES_BY_USER_ID, getStoriesByUserIdSaga),
        takeLatest(StoryTypes.GET_STORY_BY_STORY_ID, getStoryByStoryIdSaga),
        takeLatest(StoryTypes.GET_ALL_PUBLIC_STORIES, getAllPublicStoriesSaga),
        takeLatest(StoryTypes.SAVE_STORY, saveStorySaga),
        takeLatest(StoryTypes.UPDATE_STORY, updateStorySaga),
    ])
}

export default [sagas()];
