const express = require('express');
const router = express.Router();
const { getUserCart } = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { addToCart } = require('../controllers/cartController');

router.post('/add',isLoggedIn,addToCart);
router.get('/',isLoggedIn,getUserCart);

module.exports = router;