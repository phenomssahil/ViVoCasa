const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:Number,
    address:{
        street:String,
        city:String,
        state:String,
        country:String,
        postalCode:Number,
        landmark:String,
    },
    cart:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
        },
        quantity:{
            type:Number
        }
    }],
    order:[{
        orderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'orders',
        },
        status:{
            type:String,
            enum:['pending', 'delivered', 'shipped'],
            default:'pending'
        },
        createdAt:{
            type:Date,
            default: Date.now()
        }
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
    }],
    paymentMethod:[{
        type:String,
        cardNumber:Number,
        expirationDate:Number,
        nameOnCard:String,
    }],
    role:{
        type:String,
        enum: ['customer','admin'],
        default:'customer',
    }
},{timestamps:true});

const users = mongoose.model('users',userSchema);

module.exports = users;