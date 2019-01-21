import login from '../containers/login/LoginSagas';
import story from '../containers/story/StorySagas';
import {all} from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        ...login,
        ...story,
    ])
}
