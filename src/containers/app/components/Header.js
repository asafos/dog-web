import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import { SITE_NAME } from '../../../constants/appData';

const styles = {
    brand: {
        cursor: 'pointer',
        flex: 1
    }
};

class Header extends Component {

    render() {
        const {classes, history, logout} = this.props;
        return (
            <AppBar position="fixed" className={classes.header}>
                <Toolbar>
                    <Typography onClick={() => history.replace('')} 
                                variant="h6" color="inherit" className={classes.brand}>
                        {SITE_NAME}
                    </Typography>
                    <Button onClick={() => history.replace('story')} color="inherit">Story</Button>
                    <Button onClick={logout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header)
