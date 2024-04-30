const express = require('express');
const { 
    createOrder, getAllOrders, getOrderById, updateOrderStatus,
} 
= require('../controllers/orderController');
const { isAdmin, isLoggedIn } = require('../middleware/authMiddleware');
const router =  express.Router();

router.get('/getAllOrders',isAdmin,getAllOrders)
router.get('/getOrderById/:orderId',getOrderById)
router.post('/createOrder',isLoggedIn,createOrder)
router.put('/updateOrderStatus',isAdmin,updateOrderStatus)

module.exports = router;