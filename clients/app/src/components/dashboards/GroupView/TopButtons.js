import React, { Component } from 'react';
import { Button, withStyles } from '@material-ui/core';
const styles = theme => ({
  btnContainer: {
    display: 'flex'
  },
  button: {
    marginLeft: 'auto',
    marginTop: 10,
    margin: 20
  }
});

class TopButtons extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button className={classes.button} variant="contained">
          Make Payment
        </Button>

        <Button className={classes.button} variant="contained" color="primary">
          Make Payment
        </Button>

        <Button className={classes.button} variant="contained">
          Make Payment
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(TopButtons);
