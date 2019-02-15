import React from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/es';

const styles = {
    container: {},
    contentWrapper: {
        maxWidth: 740,
        width: '100%',
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

const StoryList = ({ classes, stories, editable, onDelete, onEdit, onItemPress }) => {
    return (
        <Grid container justify="center" className={classes.container}>
            <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                <List dense className={classes.root}>
                    {stories.map((story, index) => {
                        const { content: { title, summary }, writer, _id } = story;
                        return (
                            <ListItem key={index} button className={classes.storyItem} onClick={() => onItemPress(story)}>
                                <ListItemText primary={title} secondary={summary} />
                                {editable &&
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => onDelete(story)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => onEdit(story)}>
                                            <EditIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>}
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(StoryList)