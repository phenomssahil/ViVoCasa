const Order = require('../model/orders')
const Product = require('../model/products')
const User = require('../model/user')
const uniqid = require('uniqid')

require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

async function createCheckoutSessionCheckout(req,res){
    try{
        const products = req.body.items.map((item)=>{
            return{
                productId:item.product._id,
                quantity:item.quantity,
                
            }
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items: await Promise.all(req.body.items.map(async(item) => {
                const itemFromDB = await Product.findById({_id:item.product._id})
                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:itemFromDB.title,
                            images:[item.product.thumbnailImageUrl]
                        },
                        unit_amount:itemFromDB.price * 100
                    },
                    quantity:item.quantity,
                }
            })),
            shipping_cost:{
                amount:req.body.shipping
            },
            success_url:`${process.env.CLIENT_URL}/confirmation?success=true&session_id={CHECKOUT_SESSION_ID}&order=${encodeURI(JSON.stringify(products))}`,
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
        const {order} = req.query;
        const orderItems = JSON.parse(decodeURI(order));
        const address = req.body.address;
        const orderId = Math.floor(Date.now()+Math.random())

        if(orderItems.length===0) return res.status(404).json({message:"server error"})

        if(req.user){
            const order = await Order.create({
                orderId:orderId
            })

            const user = await User.findOneAndUpdate(
                {email:req.user.email},
                {$push:{orders:{orderId:orderId}},$set:{cart:[]}},
                {new:true}
            )
            
            orderItems.map((item)=>{
                order.products.push({
                    productId:item.productId,
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
            await order.save();
            return res.status(200).json({message:"order placed successfully",orderId:orderId})
        }
        else{
            const order = await Order.create({
                orderId:orderId
            })
            orderItems.map((item)=>{
                order.products.push({
                    productId:item.productId,
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
            await order.save()
            return res.status(200).json({message:"order placed successfully",orderId:orderId})
        }
    } 
    catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = {
    createCheckoutSessionCheckout,
    placeOrder
}
