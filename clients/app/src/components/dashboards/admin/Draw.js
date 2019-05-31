import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: 10
  }
});

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDraw: false
    };
  }

  render() {
    const { showDraw } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h6" component="h2" gutterBottom display="inline">
          Draw the winner for this month
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.props.handleDraw}
        >
          Draw
          <ReplayIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Draw);
