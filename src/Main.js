import React, { Component } from 'react';
import App from "./containers/app/App";
import { Route, Switch } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import theme from '../assets/themes/defaultTheme';
import Login from "./containers/login/Login";

export default class Main extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Switch>
                    <Route path="/auth" component={Login} />
                    <Route path="/" component={App} />
                </Switch>
            </MuiThemeProvider>
        );
    }
}
