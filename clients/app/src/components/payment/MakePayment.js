import React, { Component } from "react";
import { Button } from "@material-ui/core";

class MakePayment extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <p>You haven't paid for the month of March yet. Make a payment now!</p>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "auto" }}
        >
          Make Payment
        </Button>
      </div>
    );
  }
}

export default MakePayment;
