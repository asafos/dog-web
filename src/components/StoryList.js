import React from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles, CardActions } from '@material-ui/core/es';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import NoImage from '../../assets/images/no-image.png'

const styles = theme => ({
    container: {},
    contentWrapper: {
        maxWidth: 740,
        width: '100%',
        padding: '30px 24px',
    },
    storyTitle: {
        overflow: 'hidden!important',
        maxHeight: '40px!important',
        textOverflow: 'ellipsis!important',
        display: '-webkit-box!important',
        WwebkitLineClamp: '2!important',
        WebkitBoxOrient: 'vertical',
        XHeightMultiplier: '0.342!important',
        BaselineMultiplier: '0.22!important',
        fontFamily: 'medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important',
        fontWeight: '600!important',
        cursor: 'pointer'
    },
    storySummary: {
        cursor: 'pointer'
    },
    storyItem: {
        height: '5em'
    },
    card: {
        paddingBottom: '1em',
        height: 100,
        display: 'flex',
        boxShadow: 'unset'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 150,
        cursor: 'pointer'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

const StoryList = ({ classes, stories, editable, onDelete, onEdit, onItemPress }) => {
    return (
        <Grid container justify="center" className={classes.container}>
            <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                {stories.map((story, index) => {
                    const { content: { title, summary, mainImage }, writer, _id } = story;
                    return (
                        <Card className={classes.card} key={index}>
                            <CardMedia
                                onClick={() => onItemPress(story)}
                                className={classes.cover}
                                image={mainImage && mainImage.url || NoImage}
                                title={title}
                            />
                            <CardActionArea onClick={() => onItemPress(story)}>
                                <CardContent className={classes.content} style={editable ? { flex: 'none' } : {}}>
                                    <Typography component="h5" variant="h5" className={classes.storyTitle}>
                                        {title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" className={classes.storySummary}>
                                        {summary}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {editable &&
                                <CardActions>
                                    <IconButton onClick={() => onDelete(story)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onEdit(story)}>
                                        <EditIcon />
                                    </IconButton>
                                </CardActions>}
                        </Card>
                    )
                })}
            </Grid>
        </Grid>
    );
}

export default withStyles(styles, { withTheme: true })(StoryList)