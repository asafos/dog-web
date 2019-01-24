import {reducer as app} from '../containers/app/AppRedux';
import {reducer as stories} from '../containers/story/StoryRedux';
import {reducer as auth} from '../containers/login/LoginRedux';
import {reducer as notification} from '../components/notification/NotificationRedux';
import {i18nReducer as i18n} from 'react-redux-i18n';
import { reducer as form } from 'redux-form'
import { connectRouter } from 'connected-react-router';

export default (history) => ({
    app,
    auth,
    form,
    i18n,
    notification,
    router: connectRouter(history),
    stories,
});
