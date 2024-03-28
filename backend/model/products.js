const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    category: String,
    room: String,

    description:{
        type: String,
    },
    price:{
        type: Number,
    },
    thumbnailImageUrl:{
        type: String
    },
    imageUrls:[
        {
        type: String
        }
    ],
    color:{
        type: String
    },
    material:String,
    size:{
        width:Number,
        length:Number,
        height:Number
    },
    additionalDetails:{
        type:Object
    }


},{timestamps:true})

const products = mongoose.model('products',productSchema);

module.exports = products;

