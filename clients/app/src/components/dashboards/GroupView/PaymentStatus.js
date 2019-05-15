import React, { Component } from 'react';
import MakePayment from '../../payment/MakePayment';
import { Typography } from '@material-ui/core';

class PaymentStatus extends Component {
  render() {
    const hasPaid = true; //this.props;
    return (
      <div>
        {hasPaid ? (
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            You have paid for this month!
          </Typography>
        ) : (
          <MakePayment />
        )}
      </div>
    );
  }
}

export default PaymentStatus;
