const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1 get product
    // fill dummy data
    const product = {
        _id: 'asdasdas',
        name: 'MOUSE',
        description: 'Wireless Mouse',
        price: 600,
    };
    // 2 create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/`,
        customer_email: req.body.email,
        client_reference_id: product._id,
        line_items: [
            {
                price: 'price_1P7LnEIJExJPXZKLks91zK61',
                quantity: 1,
            },
        ],
    });
    // 3 send session
    res.status(200).json({
        status: 'success',
        session,
    });
});
