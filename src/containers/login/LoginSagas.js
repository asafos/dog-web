import { call, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {LoginTypes} from './LoginRedux';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getUser(action) {
    try {
        const user = yield call(() => axios.get('/api/users/current'));
        yield put({type: LoginTypes.GET_USER_SUCCEEDED, user: user});
    } catch (error) {
        yield put({type: LoginTypes.GET_USER_FAILED, error});
    }
}

function* signup(action) {
    try {
        const user = yield call(() => axios.post('/api/users/signup', {user: action}));
        yield put({type: LoginTypes.SIGNUP_SUCCEEDED, user: user});
    } catch (error) {
        yield put({type: LoginTypes.SIGNUP_FAILED, error});
    }
}

function* login(action) {
    try {
        const res = yield call(() => axios.post('/api/users/login', {user: action}));
        yield put({type: LoginTypes.LOGIN_SUCCEEDED, user: res.data.user});
    } catch (error) {
        yield put({type: LoginTypes.LOGIN_FAILED, error});
    }
}



/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* loginSagas() {
    yield all([
        takeLatest(LoginTypes.GET_USER, getUser),
        takeLatest(LoginTypes.SIGNUP, signup),
        takeLatest(LoginTypes.LOGIN, login),
    ])
}

export default [loginSagas()];
