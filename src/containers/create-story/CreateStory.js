import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm, FieldArray } from 'redux-form';
import TextField from '@material-ui/core/TextField';

const styles = {
    container: {
        width: 740,
        padding: '30px 24px',
    },
    section: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 4,
        padding: '0 16px 16px',
        marginTop: 16
    },
    buttonsWrapper: {

    }
};

class CreateStory extends Component {

    renderField = ({ input, meta: {error, touched}, ...props }) => {
        return (<TextField
            {...input}
            error={touched && !!error}
            helperText={touched && error}
            autoCapitalize="true"
            fullWidth
            margin="normal"
            // InputLabelProps={{ shrink: true }}
            {...props}
        />)
    };

    renderSections = ({ fields, meta: { error, touched }, classes }) => (
        <Grid container justify="center">
            <Grid item xs={12}>
                {fields.map((parentName, index) => (
                    <div key={index} className={classes.section}>
                        <Field name={`${parentName}.title`} component={this.renderField}
                            label="Section Title" multiline />
                        <Field name={`${parentName}.body`} component={this.renderField}
                            label="Text" multiline />
                    </div>
                ))}
            </Grid>
            <Grid item style={{marginTop: 16}}>
                <Button onClick={() => fields.push({})}>
                    Add Section
                </Button>
            </Grid>
        </Grid>
    )

    onSubmit = values => {
        console.log(values)
    };

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={12} sm="auto" className={classes.container}>
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <Field name="title" component={this.renderField}
                                label="Title" autoFocus variant="outlined" />
                            <FieldArray name={'sections'} component={this.renderSections} classes={classes} />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm="auto" className={classes.container}>
                        <Grid container justify="flex-end" >
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    console.log('validate', values)
    if (!values.title) {
        errors.title = 'Required'
    }
    return errors
}

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(styles)
        (reduxForm({
            form: 'CreateStory',
            validate,
        })
            (CreateStory)));
