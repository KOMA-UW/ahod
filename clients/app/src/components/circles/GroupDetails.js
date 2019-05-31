import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  titles: {
    padding: 5
  }
});

class GroupDetails extends Component {
  render() {
    const { classes, groupDetails } = this.props;
    return (
      <div>
        <React.Fragment>
          <Typography
            variant="body1"
            display="inline"
            color="primary"
            className={classes.titles}
          >
            Capital:
          </Typography>
          <Typography variant="body2" display="inline">
            {groupDetails.capital}
          </Typography>
          <div />
          <Typography
            variant="body1"
            display="inline"
            color="primary"
            className={classes.titles}
          >
            Contribution:
          </Typography>
          <Typography variant="body2" display="inline">
            {groupDetails.individualMonthly}
          </Typography>
          <div />
          <Typography
            variant="body1"
            display="inline"
            color="primary"
            className={classes.titles}
          >
            Winnings:
          </Typography>
          <Typography variant="body2" display="inline">
            {groupDetails.winnerPotential}
          </Typography>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(GroupDetails);
