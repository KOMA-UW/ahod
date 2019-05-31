import React, { Component } from 'react';
import SimpleCard from '../../SimpleCard';

class Payment extends Component {
  render() {
    return (
      <SimpleCard title="Enter Payment Info">
        <h6>Please provide the status of your payment!</h6>
      </SimpleCard>
    );
  }
}

export default Payment;
