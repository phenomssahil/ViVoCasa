const express = require('express');
const { 
    createOrder, getAllOrders, getOrderById, updateOrderStatus,
} 
= require('../controllers/orderController');
const { isAdmin } = require('../middleware/authMiddleware');
const router =  express.Router();

router.get('/getAllOrders',isAdmin,getAllOrders)
router.get('/getOrderById',getOrderById)
router.post('/createOrder',createOrder)
router.put('/updateOrderStatus',updateOrderStatus)

module.exports = router;