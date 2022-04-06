const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51KeviGSC74m43ybFediDw1zayo0cYx77w5BSA3xXwffI0dOeGIztYU4ex6V4uzkWk8DS7iC8UrHioqH2CzkJpzIj00I2jTdWIf')


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  res.status(200).json({ stripeApiKey: stripe });
});







