const express = require('express');

const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
    '/checkout-session/:productID',
    bookingController.getCheckoutSession
);
module.exports = router;
