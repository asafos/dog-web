import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import NotificationCreators from './NotificationRedux';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const { hideNotification } = NotificationCreators;

const styles = theme => ({
    success: {
        backgroundColor: theme.palette.primary.main,
      },
      error: {
        backgroundColor: theme.palette.error.dark,
      },
});

class Notification extends Component {

    render() {
        const { notification: { open, message, variant }, hideNotification, classes } = this.props;
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={props => <Slide {...props} direction="right" />}
                open={open}
                variant={variant}
                onClose={hideNotification}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    className: classes[variant]
                }}
                action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={hideNotification}
                    >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                message={<span id="message-id">{message}</span>} />
        );
    }
}

const mapStateToProps = ({ notification }) => ({ notification });

const mapDispatchToProps = dispatch => bindActionCreators({ hideNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notification));
