import {reducer as app} from '../containers/app/AppRedux';
import {reducer as auth} from '../containers/login/LoginRedux';
import {i18nReducer as i18n} from 'react-redux-i18n';
import { reducer as form } from 'redux-form'

export default {
    app,
    i18n,
    auth,
    form
};
