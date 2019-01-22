import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {StoryTypes} from './StoryRedux';
import { push } from 'connected-react-router'
import NotificationCreators from '../../components/notification/NotificationRedux';
import StoryCreators from './StoryRedux';

const {getStorySucceeded, getStoryFailed, getStory, saveStorySucceeded, saveStoryFailed} = StoryCreators;
const {showNotification} = NotificationCreators;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getStorySaga(action) {
    try {
        const res = yield call(() => axios.get('/api/story/' + action.storyId));
        yield put(getStorySucceeded(res.data.story));
    } catch (error) {
        yield put(getStoryFailed(error));
    }
}

function* saveStorySaga(action) {
    try {
        const res = yield call(() => axios.post('/api/story', action.story));
        yield put(saveStorySucceeded());
        yield put(showNotification('Story saved'));
        yield put(getStory(res.data.story._id));
        yield put(push('/story/' + res.data.story._id));
    } catch (error) {
        yield put(saveStoryFailed(error));
    }
}

function* sagas() {
    yield all([
        takeLatest(StoryTypes.GET_STORY, getStorySaga),
        takeLatest(StoryTypes.SAVE_STORY, saveStorySaga),
    ])
}

export default [sagas()];
