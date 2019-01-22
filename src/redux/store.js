import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import getReducers from "./reducers";
import middlewares from "./middlewares/index";
import translations from '../i18n';
import {loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const Reducers = getReducers(history);

export const store = compose(applyMiddleware(...middlewares, sagaMiddleware, routerMiddleware(history)))(createStore)(combineReducers(Reducers));

sagaMiddleware.run(rootSaga);
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('en'));
