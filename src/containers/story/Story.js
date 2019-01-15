import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SITE_NAME } from '../../constants/appData';

const styles = {
    container: {
    },
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

class Story extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container justify="center" className={classes.container}>
                    <Grid item xs={12} sm="auto" className={classes.contentWrapper}>
                        <Typography variant="h1" className={classes.storyTitle} gutterBottom>
                            Header
                        </Typography>
                        <Typography variant="subtitle1" className={classes.storySubtitle} gutterBottom>
                            Choose a category
                                </Typography>
                        <Typography variant="body1" className={classes.p} gutterBottom>
                            robably like many men in long-term relationships, I spent Christmas Eve hopelessly meandering through U.S. retailers, trying to find a solidly adequate gift for my fiance. Maxed out on giving jewelry or vacations that I secretly wanted to go on, my travels brought me to the storefronts of Soho in New York City, brimming with the real-life presences of beloved digital brands such as Allbirds, Warby Parker, and Untuckit.robably like many men in long-term relationships, I spent Christmas Eve hopelessly meandering through U.S. retailers, trying to find a solidly adequate gift for my fiance. Maxed out on giving jewelry or vacations that I secretly wanted to go on, my travels brought me to the storefronts of Soho in New York City, brimming with the real-life presences of beloved digital brands such as Allbirds, Warby Parker, and Untuckit.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Story));
