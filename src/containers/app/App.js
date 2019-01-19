import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from '../home/Home';
import Story from '../story/Story';
import CreateStory from '../create-story/CreateStory';
import LoginCreators from '../login/LoginRedux';
const { getUser, logout } = LoginCreators;

const styles = {
    container: {
        marginTop: 64,
    },
    header: {
    },
    content: {
        maxWidth: 760
    }
};

class App extends Component {

    componentDidMount() {
        const { getUser } = this.props;
        getUser();
    }

    componentWillUpdate({ auth: { fetching, user }, history }) {
        if (!user && !fetching) {
            history.push('/auth/login')
        }
    }

    render() {
        const { classes, history, auth, logout } = this.props;
        if (auth.fetching) {
            return null
        }
        return (
            <div>
                <Header history={history} logout={logout} />
                <div className={classes.container}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/story" component={Story} />
                        <Route path="/create-story" component={CreateStory} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ app, auth }) => ({ app, auth });

const mapDispatchToProps = dispatch => bindActionCreators({ getUser, logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
