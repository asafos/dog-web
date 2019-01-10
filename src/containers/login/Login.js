import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Button from "@material-ui/core/es/Button/Button";
import LoginCreators from './LoginRedux';

const {googleLogin} = LoginCreators;
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

    componentDidMount() {
        axios.get('/api/data').then(console.log)
    }

    render() {
        const {classes, googleLogin} = this.props;
        return (
            <Grid container justify="center" alignItems="center" className={classes.container}>
                <Grid item className={classes.loginWrapper}>
                    <Button onClick={googleLogin}>
                        Login with Google
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({login}) => ({login});

const mapDispatchToProps = dispatch => bindActionCreators({googleLogin}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
