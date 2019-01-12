import {reducer as app} from './AppRedux';
import {reducer as auth} from '../containers/login/LoginRedux';
import {i18nReducer as i18n} from 'react-redux-i18n';

export default {
    app,
    i18n,
    auth
};
