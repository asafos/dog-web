import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from '../home/Home';
import Story from '../story/Story';
import axios from 'axios';

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
        axios.get('/api/data').then(console.log)
    }

    render() {
        const { classes, history } = this.props;
        return (
            <div>
                <Header history={history} />
                <div className={classes.container}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/story" component={Story} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
