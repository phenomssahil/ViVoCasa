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
    dob:String,
    gender:String,
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
    cart:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
        },
        quantity:{
            type:Number
        }
    }],
    orders:[{
        orderId:{
            type:Number,
            ref:'orders',
        }
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
    }],
    paymentMethod:[{
        cardType:String,
        cardNumber:Number,
        expiryDate:Number,
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