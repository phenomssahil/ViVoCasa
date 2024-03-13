const express = require('express');
const { 
    createOrder, getAllOrders, getOrderById, updateOrderStatus,
} 
= require('../controllers/orderController');
const router =  express.Router();

router.get('/getAllOrders',getAllOrders)
router.get('/getOrderById',getOrderById)
router.post('/createOrder',createOrder)
router.put('/updateOrderStatus',updateOrderStatus)

module.exports = router;