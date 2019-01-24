import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import {SITE_NAME} from '../../../constants/appData';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Menu from "@material-ui/core/es/Menu/Menu";
import ArrowDropDown from "@material-ui/core/es/internal/svg-icons/ArrowDropDown";

const styles = {
    brand: {
        cursor: 'pointer',
        flex: 1
    }
};

class Header extends Component {

    state = {anchorEl: null};

    handleMenu = event => this.setState({anchorEl: event.currentTarget});

    handleClose = () => this.setState({anchorEl: null});

    handleNavigationMenuClick = (path) => () => {
        const {history} = this.props;
        history.replace(path);
        this.handleClose();
    };

    render() {
        const {classes, history, logout, username} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="fixed" className={classes.header}>
                <Toolbar>
                    <Typography onClick={() => history.replace('')}
                                variant="h6" color="inherit" className={classes.brand}>
                        {SITE_NAME}
                    </Typography>
                    <Button onClick={() => history.replace('/create-story')} color="inherit">New Story</Button>
                    <div>
                        <Button aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                                onClick={this.handleMenu}>
                            {username}
                            <ArrowDropDown/>
                        </Button>
                        <Menu id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={open}
                              onClose={this.handleClose}>
                            {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
                            <MenuItem onClick={this.handleNavigationMenuClick('/my-stories')}>My Stories</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header)
