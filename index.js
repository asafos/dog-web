import React from 'react';
import { render } from 'react-dom';
import Main from "./src/Main";
import {Provider} from "react-redux";
import { store, history } from "./src/redux/store";
import './css/styles.css';
import { ConnectedRouter } from 'connected-react-router';
import Favicon from './assets/images/favicon.png';

(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = Favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
})();

render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Main />
    </ConnectedRouter>
</Provider>, document.getElementById('app'));
