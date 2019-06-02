import React, { Component } from 'react';
import SimpleCard from '../../SimpleCard';
import CheckoutForm from '../../payment/CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
class Payment extends Component {
  render() {
    return (
      <SimpleCard title="Enter Payment Info">
        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
          <div className="example">
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </SimpleCard>
    );
  }
}

export default Payment;
