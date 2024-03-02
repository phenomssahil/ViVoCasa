const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const {checkAuth} = require('./middleware/checkAuth')
app.use(checkAuth)

const {connectToMongoDb} = require('./connect');
connectToMongoDb("mongodb://127.0.0.1:27017/ecommerce");

const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
app.use('/api/product',productRoute)
app.use('/api/user',userRoute)


app.listen(3000,()=>{
    console.log("running on port 3000");
})