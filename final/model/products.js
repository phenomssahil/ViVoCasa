const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        uniqure:true
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    price:{
        type: Number,
    },
    discountPercentage:{
        type: Number,
    },
    rating:{
        type: Number,
    },
    stock:{
        type: Number,
    },
    brand:{
        type: String
    },
    category:{
        type: String
    },
    thumbnail:{
        type: String
    },
    images:[
        {
        type: String
        }
    ],
    manufacturer:{
        type: String
    }
},{timestamps:true})

const products = mongoose.model('products',productSchema);

module.exports = products;

