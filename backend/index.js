const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const morgan = require('morgan');
app.use(morgan('dev'))

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173'
}));

const {checkAuth} = require('./middleware/authMiddleware')
app.use(checkAuth)

const {connectToMongoDb} = require('./connect');
connectToMongoDb("mongodb://127.0.0.1:27017/ecommerce");

const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const cartRoute = require('./routes/cartRoutes');
const orderRoute = require('./routes/orderRoutes');

app.use('/api/product',productRoute)
app.use('/api/user',userRoute)
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

const Product = require('./model/products')
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
app.post('/api/createCheckoutSession',async(req,res)=>{
    try{
        // console.log(req.body.items);
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items: await Promise.all(req.body.items.map(async(item) => {
                const itemFromDB = await Product.findById({_id:item.product._id})
                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:itemFromDB.title
                        },
                        unit_amount:itemFromDB.price * 100
                    },
                    quantity:item.quantity,
                }
            })),
            shipping_cost:{
                amount:req.body.shipping
            },
            success_url:`${process.env.CLIENT_URL}/success`,
            cancel_url:`${process.env.CLIENT_URL}/checkout`
        })
        res.json({url:session.url})
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


app.listen(3000,()=>{
    console.log("running on port 3000");
})