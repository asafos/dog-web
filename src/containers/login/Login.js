import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper";
import { withStyles } from '@material-ui/core/styles';
import LoginCreators from './LoginRedux';
import LocalLoginForm from './components/LocalLoginForm';
import { Route, Switch } from "react-router-dom";

const { googleLogin, signup, login } = LoginCreators;

const styles = {
    container: {
        padding: 20,
        height: '80vh'
    },
    loginWrapper: {
        width: 420,
        backgroundColor: 'white',
        padding: 20
    },
};

class Login extends Component {

    componentWillUpdate({ auth: { user, fetching }, history }) {
        if (user && !fetching) {
            console.log(history)
            history.push('/')
        }
    }

    render() {
        const { classes, login } = this.props;
        return (
            <Grid container justify="center" alignItems="center" className={classes.container}>
                <Grid item className={classes.loginWrapper} component={Paper}>
                    <Grid container>
                        <Grid item style={{ width: '100%' }}>
                            <Switch>
                                <Route path="/auth/login" component={props => <LocalLoginForm {...props} login={login} />} />
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators({ googleLogin, signup, login }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
