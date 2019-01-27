import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, FieldArray } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import StoryCreators from '../story/StoryRedux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

const { saveStory, getStoryByStoryId, updateStory } = StoryCreators;

const styles = {
    container: {
        width: 740,
        padding: '30px 24px',
    },
    section: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 4,
        padding: '0 16px 16px',
        marginTop: 16,
        position: 'relative'
    },
    buttonsWrapper: {},
    removeSection: {
        position: 'absolute',
        top: -12,
        right: -12,
        backgroundColor: '#f4483b',
        color: 'white',
        '&:hover': {
            backgroundColor: '#fb766c',
        }
    }
};

class CreateStory extends Component {

    state = {edit: null}

    componentDidMount() {
        const {getStoryByStoryId, match} = this.props;
        const {storyId} = match.params;
        if(storyId) {
            getStoryByStoryId(storyId);
            this.setState({edit: storyId})
        }
    }

    renderField = ({ input, meta: { error, touched }, ...props }) => {
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
                        <Fab onClick={() => fields.splice(index, 1)}
                            size="small"
                            className={classes.removeSection}>
                            <DeleteIcon />
                        </Fab>
                        <Field name={`${parentName}.title`} component={this.renderField}
                            label="Section Title" multiline />
                        <Field name={`${parentName}.body`} component={this.renderField}
                            label="Text" multiline />
                    </div>
                ))}
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
                <Button onClick={() => fields.push({})}>
                    Add Section
                </Button>
            </Grid>
        </Grid>
    );

    onSubmit = values => {
        const { saveStory, updateStory } = this.props;
        const { edit } = this.state;
        if(edit) {
            updateStory(values)
        }
        saveStory(values);
    };

    render() {
        const { classes, handleSubmit, stories: { fetching } } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} sm="auto" className={classes.container}>
                        <Field name="title" component={this.renderField}
                            label="Title" variant="outlined" />
                        <Field name="summary" component={this.renderField}
                            label="Summary" variant="outlined" multiline />
                        <FieldArray name={'sections'} component={this.renderSections} classes={classes} />
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

const mapStateToProps = ({ stories }, {match}) => {
    console.log('stories.currentStory.content', stories.currentStory.content);
    console.log('match.params.storyId', match.params.storyId);
    return ({ stories, initialValues: match.params.storyId ? stories.currentStory.content : undefined });
}
const mapDispatchToProps = dispatch => bindActionCreators({ saveStory, getStoryByStoryId, updateStory }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)
        (reduxForm({
            form: 'CreateStory',
            validate,
            enableReinitialize: true
        })(withStyles(styles)(CreateStory)));
