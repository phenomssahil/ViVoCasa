const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId:{
        required: true,
        unique: true,
        type: Number
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
    }],
    name:String,
    email:String,
    address:{
        street:String,
        city:String,
        state:String,
        country:{
            type:String,
            default:'india'
        },
        pincode:Number,
        landmark:String,
    },
    
},{timestamps:true})

const orders = mongoose.model('orders',orderSchema);

module.exports = orders;