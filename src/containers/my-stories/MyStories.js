import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StoryCreators from '../story/StoryRedux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const { getStoriesByUserId } = StoryCreators;

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
    storyItem: {
        height: '5em'
    }
};

class MyStories extends Component {

    componentDidMount() {
        const { getStoriesByUserId } = this.props;
        getStoriesByUserId();
    }

    render() {
        const { classes, stories: { fetching, content }, history } = this.props;

        if (fetching) return null;

        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                    <Typography variant="h1" className={classes.storyTitle} gutterBottom>
                        My Stories
                    </Typography>
                    <List dense className={classes.root}>
                        {content.map(({ content: { title, summary }, writer, _id }, index) => (
                            <ListItem key={index} button className={classes.storyItem} onClick={() => history.push('/story/' + _id)}>
                                <ListItemText primary={title} secondary={summary}/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => history.push('/story/' + _id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => history.push('/story/' + _id)}>
                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ stories }) => ({ stories });

const mapDispatchToProps = dispatch => bindActionCreators({ getStoriesByUserId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyStories));
