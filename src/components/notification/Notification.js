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
        const { notification: { error, open, message, variant }, hideNotification, classes } = this.props;
        let errorText = '';
        if(error) {
            if(typeof error === 'string') {
                errorText = error;
            } else if(typeof error === 'object' && error.errors) {
                errorText = Object.keys(error.errors).reduce((acc, item) => {
                    return acc += item + ' ' + error.errors[item]
                }, '')
            }
        }
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
                message={<span id="message-id">{message + ' ' + errorText}</span>} />
        );
    }
}

const mapStateToProps = ({ notification }) => ({ notification });

const mapDispatchToProps = dispatch => bindActionCreators({ hideNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Notification));
