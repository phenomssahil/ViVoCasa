const express = require('express');
const app = express();
require('dotenv').config()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const morgan = require('morgan');
app.use(morgan('dev'))

const cors = require('cors');
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
    credentials:true
}));

const {checkAuth} = require('./middleware/authMiddleware')
app.use(checkAuth)

const {connectToMongoDb} = require('./connect');
connectToMongoDb(`${process.env.MONGO_URL}`);

const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const cartRoute = require('./routes/cartRoutes');
const orderRoute = require('./routes/orderRoutes');
const paymentRoute = require('./routes/paymentRouter')

app.use('/api/product',productRoute)
app.use('/api/user',userRoute)
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);
app.use('/api/payment',paymentRoute)

app.get('/',(req, res) => {
    res.send("Backend server is working")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`);
})