import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import {Route, Switch} from "react-router-dom";
import { SITE_NAME } from '../../../constants/appData';

const styles = {
    header: {
    }
};

class Header extends Component {

    render() {
        const {classes, history} = this.props;
        return (
            <AppBar position="fixed" className={classes.header}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{flex: 1}}>
                        {SITE_NAME}
                    </Typography>
                    <Button onClick={() => history.replace('projects')} color="inherit">Projects</Button>
                    <Button color="inherit">Contact Me</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header)
