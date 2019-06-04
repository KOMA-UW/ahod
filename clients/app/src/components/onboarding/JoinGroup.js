import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../SimpleCard';
import JoinGroupForm from './JoinGroupForm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
});

class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupJoined: false,
      open: false
    };
  }

  handleClick = () => {
    this.setState({
      open: false
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false
    });
  };

  handleGroupJoin = () => {
    this.setState({ groupJoined: true, open: true });
    setTimeout(() => {
      this.setState({ groupJoined: false });
    }, 5000);
  };
  render() {
    const { classes } = this.props;
    const { groupJoined, open } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <SimpleCard>
              <JoinGroupForm handleGroupJoin={this.handleGroupJoin} />
              {groupJoined && (
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={this.handleClose}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                  }}
                  message={
                    <span id="message-id">
                      You have successfully joined a new group. Please check
                      your email for details!
                    </span>
                  }
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
                />
              )}
            </SimpleCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(JoinGroup);
