import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Button from "@material-ui/core/es/Button/Button";
import LoginCreators from './LoginRedux';

const {googleLogin, signup, login} = LoginCreators;

const styles = {
    container: {
        padding: 20,
        height: '80vh'
    },
    loginWrapper: {
        maxWidth: 720,
        backgroundColor: 'white'
    },
};

class Login extends Component {

    componentWillUpdate({auth: {user, fetching}, history}) {
        if(user && !fetching) {
            console.log(history)
            history.push('/')
        }
    }

    signup = () => {
        const {signup} = this.props;
        signup('test@test.com', '123456');
    };
    
    login = () => {
        const {login} = this.props;
        login('test@test.com', '123456');
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center" alignItems="center" className={classes.container}>
                <Grid item className={classes.loginWrapper}>
                    <Button onClick={this.signup}>
                        Signup
                    </Button>
                    <Button onClick={this.login}>
                        login
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = dispatch => bindActionCreators({googleLogin, signup, login}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
