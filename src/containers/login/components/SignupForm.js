import React, { Component } from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PawIcon from '@material-ui/icons/Pets';
import { Link } from "react-router-dom";

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

class SignupForm extends Component {

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
        const { signup } = this.props;
        signup(email, password)
    };

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container className={classes.formWrapper} justify="space-between">
                    <Grid item xs={12}>
                        <Field name="email" label="Email" type="email"
                            component={this.renderTextField} autoComplete="email" autoCapitalize="false" />
                        <Field name="password" label="Password" type="password"
                            component={this.renderTextField} />
                        <Field name="verifyPassword" label="Verify Password" type="password"
                            component={this.renderTextField} />
                    </Grid>
                    <Grid item className={classes.linkContainer}>
                        <Link to="/auth/login" className={classes.link} variant="flat">
                            Already have an account?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="large"
                            type="submit" className={classes.button}>
                            Signup
                    </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.verifyPassword) {
        errors.verifyPassword = 'Required'
    } else if(values.password !== values.verifyPassword) {
        errors.verifyPassword = 'Passwords are not identical'
    }
    return errors
};


export default reduxForm({
    validate,
    form: 'SignupForm'
})(withStyles(styles)(SignupForm))
