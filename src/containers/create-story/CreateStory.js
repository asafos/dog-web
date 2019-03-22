import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, FieldArray } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import StoryCreators from '../story/StoryRedux';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    },
    image: {
        maxWidth: '100%',
        maxHeight: '200px',
    },
    imageCOntainer: {
        textAlign: 'center',
        paddingTop: 16,
        cursor: 'pointer'
    },
    button: {
        marginLeft: 16
    }
};

class CreateStory extends Component {

    state = { edit: null }

    componentDidMount() {
        const { getStoryByStoryId, match } = this.props;
        const { storyId } = match.params;
        if (storyId) {
            getStoryByStoryId(storyId);
            this.setState({ edit: storyId })
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

    renderCheckboxField = ({ input, label }) => (
        <FormControlLabel
            control={<Checkbox onChange={input.onChange} checked={input.value} />}
            label={label}
        />
    )

    renderTextSection() {
        return
    }

    renderDropZone = ({ input: { onChange, value } }) => {
        const { classes } = this.props;
        return (
            <Dropzone onDrop={acceptedFiles => {
                const reader = new FileReader();
                reader.onload = () => {
                    onChange({ name: acceptedFiles[0].name, base64: reader.result });
                };
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.readAsDataURL(acceptedFiles[0]);
            }}>
                {({ getRootProps, getInputProps, isDragActive }) => {
                    return (
                        <div
                            {...getRootProps()}
                            className={classNames(classes.section, classes.imageCOntainer)}
                        >
                            <input {...getInputProps()} />
                            {value.base64 || value.url ?
                                <img src={value.base64 || value.url} className={classes.image} /> :
                                isDragActive ?
                                    <p>Drop files here...</p> :
                                    <p>Try dropping some files here, or click to select files to upload.</p>
                            }
                        </div>
                    )
                }}
            </Dropzone>
        );
    };

    renderSections = ({ fields, meta: { error, touched }, classes }) => (
        <Grid container justify="center">
            <Grid item xs={12}>
                {fields.map((parentName, index) => fields.get(index).image ?
                    <div style={{ position: 'relative' }}>
                        <Field key={index} component={this.renderDropZone} name={`${parentName}.image`} />
                        <Fab onClick={() => fields.splice(index, 1)}
                            size="small"
                            className={classes.removeSection}>
                            <DeleteIcon />
                        </Fab>
                    </div> :
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
                )}
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
                <Button onClick={() => fields.push({})}>
                    Add Section
                </Button>
                <Button onClick={() => fields.push({ image: {} })}>
                    Add Image
                </Button>
            </Grid>
        </Grid>
    );

    onSubmit = values => {
        const { saveStory, updateStory, stories: { currentStory } } = this.props;
        const { edit } = this.state;
        const p = values.public;
        delete values.public;
        if (edit) {
            return updateStory({ ...currentStory, content: values, public: p })
        }
        return saveStory(values);
    };

    render() {
        const { classes, handleSubmit, stories: { fetching }, history } = this.props;
        console.log(history)
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container justify="center">
                    <Grid item xs={12} sm="auto" className={classes.container}>
                        <Field component={this.renderDropZone} name={`mainImage`} />
                        <Field name="title" component={this.renderField}
                            label="Title" variant="outlined" />
                        <Field name="summary" component={this.renderField}
                            label="Summary" variant="outlined" multiline />
                        <FieldArray name={'sections'} component={this.renderSections} classes={classes} />
                        <Field name="public" component={this.renderCheckboxField} label="Public" />
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button variant="contained" disabled={fetching}
                                    className={classes.button} onClick={() => history.goBack()}>
                                    Previous
                                </Button>
                                <Button type="submit" variant="contained" color="primary"
                                    disabled={fetching} className={classes.button}>
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

const mapStateToProps = ({ stories }, { match }) => {
    let initialValues;
    if (match.params.storyId) {
        initialValues = { ...stories.currentStory.content, public: stories.currentStory.public }
    }
    return { stories, initialValues }
}

const mapDispatchToProps = dispatch => bindActionCreators({ saveStory, getStoryByStoryId, updateStory }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)
    (reduxForm({
        form: 'CreateStory',
        validate,
        enableReinitialize: true
    })(withStyles(styles)(CreateStory)));
