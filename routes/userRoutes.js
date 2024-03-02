const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)
.delete(userController.deleteUser);

router.route('/profile')
.get(userController.getUserProfile)
.put(userController.updateUserProfile)

router.post('/login',authController.handleUserLogin)
router.post('/signup',authController.handleUserSignup)

// router.route('/cart')
// .get(getUserCart);
// .put(updateUserCart);

// router.get('/order',getOrderHistory);
// router.get('/wishlist',getUserWishlist);

// router.route('/profile/address')
// .get(getUserAddress);
// .put(updateUserAdrress);

module.exports = router;