const router = require('express').Router();
const stripe = require('./stripe')

router.post('/', async (req, res) => {
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create

    console.log(req.body);

    const { currency, amount, email } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: currency,
            amount: amount,
            // automatic_payment_methods: { enabled: true },
            payment_method_types: ['card'],
        });

        // Send publishable key and PaymentIntent details to client
        res.send({
        clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        console.log(">>", e);
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});


module.exports = router;