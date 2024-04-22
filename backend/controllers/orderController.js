const Orders = require('../model/orders')
const uniqid = require('uniqid');
const Users = require('../model/user');

async function getAllOrders(req, res) {
    try {
        const orders = await Orders.find();
    
        res.json(orders);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}
async function getOrderById(req, res) {
    try {
        
        const order = await Orders.findOne({orderId: req.body.orderId});
    
        res.json(order);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}
async function createOrder(req,res){
    try {
        const cart = req.user.cart;
        const email = req.user.email

        const order = await Orders.create({products:cart})
        await Users.updateOne({email:email},{$push:{orders:[{orderId:order._id}]}})
    
        res.json({"message":"order created successfully"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}
async function updateOrderStatus(req,res){
    try {
        await Orders.updateOne({orderId:req.body.orderId,status:req.body.status});
        res.send("order updated successfully");
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
}