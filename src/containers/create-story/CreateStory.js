import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import {withStyles} from '@material-ui/core/styles';
import {Field, reduxForm, FieldArray} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import StoryCreators from '../story/StoryRedux';

const {saveStory} = StoryCreators;

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
    buttonsWrapper: {}
};

class CreateStory extends Component {

    renderField = ({input, meta: {error, touched}, ...props}) => {
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

    renderSections = ({fields, meta: {error, touched}, classes}) => (
        <Grid container justify="center">
            <Grid item xs={12}>
                {fields.map((parentName, index) => (
                    <div key={index} className={classes.section}>
                        <Field name={`${parentName}.title`} component={this.renderField}
                               label="Section Title" multiline/>
                        <Field name={`${parentName}.body`} component={this.renderField}
                               label="Text" multiline/>
                    </div>
                ))}
            </Grid>
            <Grid item style={{marginTop: 16}}>
                <Button onClick={() => fields.push({})}>
                    Add Section
                </Button>
            </Grid>
        </Grid>
    );

    onSubmit = values => {
        const {saveStory} = this.props;
        saveStory(values);
    };

    render() {
        const {classes, handleSubmit, stories: {fetching}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} sm="auto" className={classes.container}>
                        <Field name="title" component={this.renderField}
                               label="Title" autoFocus variant="outlined"/>
                        <FieldArray name={'sections'} component={this.renderSections} classes={classes}/>
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" disabled={fetching}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required'
    }
    errors.sections = [];
    values.sections && values.sections.forEach((s, index) => {
        const sectionsErrors = {};
        if (!s.body) {
            sectionsErrors.body = 'Required';
        }
        errors.sections[index] = sectionsErrors;
    });
    return errors
};

const mapStateToProps = ({stories}) => ({stories});

const mapDispatchToProps = dispatch => bindActionCreators({saveStory}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)
(reduxForm({
    form: 'CreateStory',
    validate,
})(CreateStory)));
