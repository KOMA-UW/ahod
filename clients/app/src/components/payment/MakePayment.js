import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import Payment from '../dashboards/GroupView/Payment';

class MakePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div>
        <p>You haven't paid for the month of June yet. Make a payment now!</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.setState({ open: true })}
        >
          Make Payment
        </Button>
        {this.state.open && <Payment />}
      </div>
    );
  }
}

export default MakePayment;
