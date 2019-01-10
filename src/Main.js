import React, {Component} from 'react';
import App from "./containers/app/App";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import theme from '../assets/themes/defaultTheme';
import Login from "./containers/login/Login";

export default class Main extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={App}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}
