import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StoryCreators from '../story/StoryRedux';

const {getStoriesByUserId} = StoryCreators;

const styles = {
    container: {},
    contentWrapper: {
        width: 740,
        padding: '30px 24px',
    },
    storyTitle: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 34,
        lineHeight: '1.25em',
        fontStyle: 'normal!important',
        fontWeight: '500!important',
        color: 'rgba(0,0,0,.84)',
        letterSpacing: 0,
    },
    p: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 21,
        lineHeight: 1.58,
        letterSpacing: '-.003em',
        color: 'rgba(0,0,0,.84)'
    }
};

class MyStories extends Component {

    componentDidMount() {
        const {getStoriesByUserId} = this.props;
        getStoriesByUserId();
    }

    render() {
        const {classes, stories: {fetching, content}, history} = this.props;

        if (fetching) return null;

        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                    <Typography variant="h1" className={classes.storyTitle} gutterBottom>
                        My Stories
                    </Typography>
                    {content.map(({content: {title, body}, writer, _id}, index) => (
                        <div key={index} onClick={() => history.push('/story/' + _id)}>
                            <Typography variant="subtitle1" className={classes.storySubtitle} gutterBottom>
                                {title}
                            </Typography>
                        </div>
                    ))}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({stories}) => ({stories});

const mapDispatchToProps = dispatch => bindActionCreators({getStoriesByUserId}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyStories));
