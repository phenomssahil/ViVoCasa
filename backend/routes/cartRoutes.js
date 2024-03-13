const express = require('express');
const router = express.Router();
const { getUserCart } = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { 
    addToCart, 
    removeItemFromCart 
} 
= require('../controllers/cartController');

router.get('/',isLoggedIn,getUserCart);
router.post('/add',isLoggedIn,addToCart);
router.post('/add',isLoggedIn,removeItemFromCart);

module.exports = router;