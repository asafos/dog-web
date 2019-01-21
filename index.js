import React from 'react';
import { render } from 'react-dom';
import Main from "./src/Main";
import Provider from "react-redux/es/components/Provider";
import { store, history } from "./src/redux/store";
import './css/styles.css';
import { ConnectedRouter } from 'connected-react-router';

render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Main />
    </ConnectedRouter>
</Provider>, document.getElementById('app'));
