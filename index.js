const express = require('express');
const cors = require('cors');
const app = express();
// Routes
const welcome = require('./api/welcome');
const payment = require('./api/payment');
const webhook = require('./api/webhook');

// Replace if using a different env file or config
require('dotenv').config({path: '.env'});


app.use(cors())
app.use(express.json());

app.get('/', welcome)

app.post('/create-payment-intent', payment);

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post('/webhook', webhook);

app.listen(9001, () => console.log('Running on port 9001'));

