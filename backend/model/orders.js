const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId:{
        required: true,
        unique: true,
        type: String
    },
    status:{
        type: String,
        enum:['pending','shipped','delivered','cancelled'],
        default:'pending',
    },
    products:[{
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        quantity:{
            type: Number,
        }
    }]
    
},{timestamps:true})

const orders = mongoose.model('orders',orderSchema);

module.exports = orders;