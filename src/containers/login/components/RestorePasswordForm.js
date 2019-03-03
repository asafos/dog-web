import React, { Component } from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PawIcon from '@material-ui/icons/Pets';
import { Link } from "react-router-dom";
import Axios from 'axios';

const styles = {
    formWrapper: {
        width: '100%',
        paddingRight: 14
    },
    textField: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
        marginBottom: 8,
        textTransform: 'none'
    },
    linkContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        textDecoration: 'none',
        fontSize: 14,
        marginLeft: 16,
        color: '#235b9e'
    },
    helperText: {
        position: 'absolute',
        bottom: -16
    }
};

class RestorePasswordForm extends Component {

    state = {
        fetching: true,
        error: false,
        success: ''
    }

    componentDidMount() {
        axios.get('auth/validate-reset-password-token').then(() => {
            this.setState({ fetching: false });
        }).catch(e => {
            this.setState({ fetching: false, error: true });
        })
    }

    renderTextField = ({ meta: { touched, error }, input, ...props }) => {
        const { classes } = this.props;
        return (
            <TextField
                {...input}
                {...props}
                error={touched && !!error}
                helperText={touched && error}
                className={classes.textField}
                margin="normal"
                fullWidth
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <PawIcon color={!touched ? undefined : error ? 'error' : 'primary'} />
                    </InputAdornment>,
                }}
                FormHelperTextProps={{ className: classes.helperText }}
            />
        )
    };

    onSubmit = ({ email, password }) => {
        return axios.post('/api/users/reset-password', { email, password, token }).then(() => { })
    };

    render() {
        const { classes, handleSubmit } = this.props;
        const { fetching, error } = this.state;

        if (fetching) return null;

        if (error) {
            return (
                <Grid container className={classes.formWrapper} justify="space-between">
                    <Grid item xs={12}>
                        Link is invalid or have expired
                    </Grid>
                </Grid>
            )
        }

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container className={classes.formWrapper} justify="space-between">
                    <Grid item xs={12}>
                        <Field name="password" label="Password" type="password"
                            component={this.renderTextField} />
                        <Field name="verifyPassword" label="Verify Password" type="password"
                            component={this.renderTextField} />
                    </Grid>
                    <Grid item className={classes.linkContainer}>
                        <Link to="/auth/login" className={classes.link} variant="flat">
                            Go to login page
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="large"
                            type="submit" className={classes.button}>
                            Restore Password
                    </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.verifyPassword) {
        errors.verifyPassword = 'Required'
    } else if (values.password !== values.verifyPassword) {
        errors.verifyPassword = 'Passwords are not identical'
    }
    return errors
};


export default reduxForm({
    validate,
    form: 'RestorePasswordForm'
})(withStyles(styles)(RestorePasswordForm))
