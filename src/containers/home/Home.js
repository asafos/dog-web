import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {SITE_NAME} from '../../constants/appData';
import GridTiles from './components/GridTiles';
import Zoom from 'react-reveal/Zoom';

const styles = {
    container: {
        marginTop: 420,
        paddingTop: 64,
        zIndex: 10,
        // width: 'calc(100vh)',
        backgroundColor: 'white',
        position: 'relative',
        maxWidth: 'none',
        boxShadow: '0px -4px 4px -1px rgba(0,0,0,0.1)'
    },
    name: {
        color: 'white',
        marginRight: 48,
        textShadow: '0px 0px 7px #000000'
    },
    avatar: {
        width: 100,
        height: 100,
        margin: 16
    },
    jobTitle: {
        margin: 16
    },
    fixedBackground: {
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        // width: window.innerWidth,
        height: 420,
        backgroundColor: '#FFFFFF !important',
        backgroundImage: 'url(https://ybxzcgnc7b-flywheel.netdna-ssl.com/wp-content/uploads/2017/11/cute-puppy-names.jpg) !important',
        backgroundRepeat: 'no-repeat !important',
        backgroundAttachment: 'scroll !important',
        backgroundPosition: '50% 18% !important',
        zIndex: 1,
        backgroundSize: 'cover !important',
        WebkitBackgroundSize: 'cover !important',
    },
    gridContainer: {
        padding: 32
    }
};

class Home extends Component {

    state = {width: window.innerWidth}

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => this.setState({width: window.innerWidth});

    render() {
        const {classes} = this.props;
        const {width} = this.state;
        return (
            <div>
                <Grid container justify="flex-end" alignItems="center" className={classes.fixedBackground}>
                    <Grid item>
                        <Typography variant="h2" className={classes.name}>
                            {SITE_NAME}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{width}} className={classes.container}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" direction="column">
                            <Grid item>
                                <Typography variant="h3" className={classes.header}>
                                    Header
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" className={classes.jobTitle}>
                                    Choose a category
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridContainer}>
                                <GridTiles/>
                            </Grid>
                            <Grid component={Zoom} item xs={12} className={classes.gridContainer}>
                                HOPAAA
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({app}) => ({app});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
