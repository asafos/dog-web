import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StoryCreators from '../story/StoryRedux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import StoryList from '../../components/StoryList';
const { getStoriesByUserId, removeStory } = StoryCreators;

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
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif',
        fontSize: 26,
        lineHeight: '1.25em',
        fontStyle: 'normal!important',
        fontWeight: '500!important',
        color: 'rgba(0,0,0,.84)',
        letterSpacing: 0,
    },
    storyItem: {
        height: '5em'
    }
};

class MyStories extends Component {

    state = { openRemoveModal: null };

    componentDidMount() {
        const { getStoriesByUserId } = this.props;
        getStoriesByUserId();
    }

    openRemoveModal = (id) => this.setState({ openRemoveModal: id })

    closeRemoveModal = () => this.setState({ openRemoveModal: null })

    removeStory = () => {
        const { removeStory } = this.props;
        const { openRemoveModal } = this.state;
        removeStory(openRemoveModal)
        this.closeRemoveModal();
    }

    render() {
        const { classes, stories: { fetching, content }, publicStories, draftStories, history } = this.props;
        const { openRemoveModal } = this.state;

        if (fetching) return null;

        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                    <Typography variant="h1" className={classes.storyTitle} gutterBottom>
                        My Stories
                    </Typography>
                    <Typography variant="h2" className={classes.subTitle} gutterBottom>
                        Public
                    </Typography>
                    <StoryList stories={publicStories} editable onDelete={({_id}) => this.openRemoveModal(_id)} onEdit={({_id}) => history.push('/create-story/' + _id)}/>
                    <Typography variant="h2" className={classes.subTitle} gutterBottom>
                        Drafts
                    </Typography>
                    <StoryList stories={draftStories} editable onDelete={({_id}) => this.openRemoveModal(_id)} onEdit={({_id}) => history.push('/create-story/' + _id)}/>
                    <Dialog open={!!openRemoveModal} onClose={this.handleClose}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this story?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeRemoveModal}>
                                Cancel
                              </Button>
                            <Button onClick={this.removeStory} color="primary" autoFocus>
                                Remove
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ stories }) => ({ stories, publicStories: stories.content.filter(s => s.public), draftStories: stories.content.filter(s => !s.public) });

const mapDispatchToProps = dispatch => bindActionCreators({ getStoriesByUserId, removeStory }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyStories));
