import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import { AwesomeButton } from "react-awesome-button";

const styles = theme => ({
  btnContainer: {
    display: "flex"
  },
  button: {
    marginLeft: "auto",
    marginTop: 10,
    margin: 20
  }
});

class SideButtons extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AwesomeButton
          type="primary"
          className={classes.button}
          ripple
          onClick={this.props.showPayment}
        >
          Make Payment
        </AwesomeButton>

        <AwesomeButton
          type="secondary"
          color="secondary"
          className={classes.button}
          ripple
          onClick={this.props.showPlea}
        >
          Request Payment
        </AwesomeButton>
      </div>
    );
  }
}

export default withStyles(styles)(SideButtons);
