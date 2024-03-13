const Orders = require('../model/orders')
const uniqid = require('uniqid');

async function getAllOrders(req, res) {
    try {
        const orders = await Orders.find();
    
        res.json(orders);
    } 
    catch (error) {
        console.log(error);
        res.json({error:error.message});
    }
}
async function getOrderById(req, res) {
    try {
        
        const order = await Orders.findOne({orderId: req.body.orderId});
    
        res.json(order);
    } 
    catch (error) {
        console.log(error);
        res.json({error:error.message});
    }
}
async function createOrder(req,res){
    try {
        const cart = req.user.cart[0];

        const orderId = uniqid(8);
        console.log(orderId);

        await Orders.create({orderId: orderId,products:cart})
    
        res.send("order created successfully");
        // res.redirect("/confirmationPage");
    } 
    catch (error) {
        console.log(error);
        res.json({error:error.message});
    }
}
async function updateOrderStatus(req,res){
    try {
        await Orders.updateOne({orderId:req.body.orderId,status:req.body.status});
        res.send("order updated successfully");
    } 
    catch (error) {
        console.log(error);
        res.json({error:error.message});
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
}