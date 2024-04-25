const express = require('express');
const router = express.Router();
const { createCheckoutSessionCheckout, placeOrder } = require('../controllers/paymentController');

router.post('/createCheckoutSession',createCheckoutSessionCheckout);
router.post('/success',placeOrder)

module.exports = router;