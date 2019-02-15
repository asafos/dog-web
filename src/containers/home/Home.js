import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StoryList from '../../components/StoryList';
import StoryCreators from '../story/StoryRedux';

const {getAllPublicStories} = StoryCreators;

const styles = {
    container: {
        paddingTop: 64,
        zIndex: 10,
        maxWidth: 'none',
    },
};

class Home extends Component {

    componentDidMount() {
        const {getAllPublicStories} = this.props;
        getAllPublicStories();
    }

    render() {
        const { classes, stories: { content, fetching }, history } = this.props;

        if (fetching) return <div>LOADING</div>;

        return (
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" direction="column">
                        <Grid item xs={12}>
                            <Typography variant="h3" className={classes.header}>
                                Stories
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <StoryList stories={content} onItemPress={({ _id }) => history.push('/story/' + _id)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ app, stories }) => ({ app, stories });

const mapDispatchToProps = dispatch => bindActionCreators({getAllPublicStories}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
