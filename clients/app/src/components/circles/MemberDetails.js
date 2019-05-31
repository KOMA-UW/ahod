import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  centerWrapper: {
    display: 'table',
    width: '100%',
    height: '100%'
  },
  titles: {
    padding: 5
  },
  avatar: {
    '&::overlay': {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      opacity: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      transition: 'opacity .25s',
      zIndex: 1
    }
  },
  avatarOverlay: {
    background:
      'linear-gradient(rgba(39, 33, 33, 0.42),rgba(189, 189, 189, 0.6))'
  },
  avatarTextOverlay: {
    fontWeight: 900,
    color: 'white',
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999
  }
});
class MemberDetails extends Component {
  render() {
    const { classes, userDetails, winner } = this.props;
    const { name, photoUrl, winningRound, winningAmount } = userDetails;

    return (
      <React.Fragment>
        <div className={classes.avatarOverlay}>
          <div className={classes.avatarTextOverlay}>
            <Typography variant="h6" className={classes.titles}>
              {name} {winner ? ' is the winner' : ''}
            </Typography>

            {winningRound && (
              <div>
                <Typography variant="body2" color="primaryColor">
                  Won: {winningRound}
                </Typography>
                <Typography variant="body2" color="primaryColor">
                  Amount: {winningAmount}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <Avatar
          src={photoUrl}
          className={classNames(classes.centerWrapper, classes.avatar, 'tint')}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MemberDetails);
