import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import Reducers from "./reducers";
import middlewares from "./middlewares/index";
import translations from '../i18n';
import {loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = compose(applyMiddleware(...middlewares, sagaMiddleware))(createStore)(combineReducers(Reducers));

sagaMiddleware.run(rootSaga);
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('en'));
