import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StoryCreators from './StoryRedux';

const { getStoryByStoryId } = StoryCreators;

const styles = {
    container: {},
    contentWrapper: {
        width: 740,
        padding: '30px 24px',
    },
    storyTitle: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 42,
        lineHeight: '1.25em',
        fontStyle: 'normal!important',
        fontWeight: '400!important',
        color: 'rgba(0,0,0,.84)',
        letterSpacing: 0,
    },
    storySummary: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 20,
        lineHeight: '1.25em',
        fontStyle: 'normal!important',
        fontWeight: '400!important',
        color: 'rgba(0,0,0,.54)',
        letterSpacing: 0,
    },
    p: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 21,
        lineHeight: 1.58,
        letterSpacing: '-.003em',
        color: 'rgba(0,0,0,.84)',
        whiteSpace: 'pre-wrap',
    },
    sectionTitle: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 26,
        fontWeight: '600!important',
        lineHeight: '1.22em',
    },
    section: {
        marginTop: '28px'
    },
    topContainer: {
        marginBottom: '4em'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '200px',
    },
    imageContainer: {
        textAlign: 'center'
    }
};

class Story extends Component {

    componentDidMount() {
        const { getStoryByStoryId, match } = this.props;
        getStoryByStoryId(match.params.storyId);
    }

    renderSection = ({ title, body, image }, index) => {
        const { classes } = this.props;
        if (image) {
            return (
                <div className={classes.imageContainer}>
                    <img src={image.url || image.base64} className={classes.image} />
                </div>
            )
        }
        return (<div key={index} className={classes.section}>
            <Typography variant="subtitle1" className={classes.sectionTitle} gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" className={classes.p} gutterBottom>
                {body}
            </Typography>
        </div>)
    }

    render() {
        const { classes, stories: { fetching, currentStory: { content: { title, summary, sections = [] } } } } = this.props;

        if (fetching) return null;

        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                    <div className={classes.topContainer}>
                        <Typography variant="h1" className={classes.storyTitle} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="p" className={classes.storySummary} gutterBottom>
                            {summary}
                        </Typography>
                    </div>
                    {sections.map(this.renderSection)}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ stories }) => ({ stories });

const mapDispatchToProps = dispatch => bindActionCreators({ getStoryByStoryId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Story));
