const stripe = require('stripe')('sk_test_DSd1HW8rpd3tv3JGiP9JeSfn00fyDGNufM');
 
const exphlb = require('express-handlebars')

const customer = await stripe.customers.create({
  email: 'customer@example.com'
});


exports.chargeUser = (req, res, next) => {
    const amount = req.body.amount

    // creating the customer to be charged..
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source:red.body.stripeToken
      }).then(customer => stripe.charges.create({

      }));
}