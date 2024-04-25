const Order = require('../model/orders')
const Product = require('../model/products')
const User = require('../model/user')
const uniqid = require('uniqid')

require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

async function createCheckoutSessionCheckout(req,res){
    try{
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
            success_url:`${process.env.CLIENT_URL}/confirmation?success=true&session_id={CHECKOUT_SESSION_ID}&order=${encodeURI(JSON.stringify(req.body.items))}`,
            cancel_url:`${process.env.CLIENT_URL}/confirmation?success=false`
        })
        res.json({url:session.url,id:session.id})
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}
async function placeOrder(req,res){
    try {
        const {session_id,order} = req.query;
        const orderItems = JSON.parse(decodeURI(order));
        const address = req.body.address;

        if(req.user){
            const orderId = Math.floor(Date.now()+Math.random())
            const order = await Order.create({
                orderId:orderId
            })

            const user = await User.findOneAndUpdate({email:req.user.email})
            user.orders.push({orderId:orderId}) 
            
            orderItems.map((item)=>{
                order.products.push({
                    productId:item.product._id,
                    quantity:item.quantity
                })
                user.cart.pull({productId:item.product._id})
            })
            order.set({
                name:address.name,
                email:address.email,
                address:{
                    street:address.street,
                    city:address.city,
                    state:address.state,
                    pincode:address.pincode,
                    landmark:address.landmark
                }
            })
            order.save();
            user.save();
        }
        else{
            const orderId = Math.floor(Date.now()+Math.random())
            const order = await Order.create({
                orderId:orderId
            })
            orderItems.map((item)=>{
                order.products.push({
                    productId:item.product._id,
                    quantity:item.quantity
                })
            })
            order.set({
                name:address.name,
                email:address.email,
                address:{
                    street:address.street,
                    city:address.city,
                    state:address.state,
                    pincode:address.pincode,
                    landmark:address.landmark
                }
            })
            order.save()
        }

        return res.json({message:"order placed successfully"})
    } 
    catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = {
    createCheckoutSessionCheckout,
    placeOrder
}
