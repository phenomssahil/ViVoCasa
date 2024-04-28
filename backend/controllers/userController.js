const { response } = require('express');
const User = require('../model/user');
const Product = require('../model/products');
const Order = require('../model/orders');
const bcrypt = require('bcrypt');

async function getAllUsers(req,res){
    try{
        const user = await User.find();
        
        if(!user){
            return res.json({message: 'No user found'});
        }
        return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.json({message: err.message});
    }
} 
async function createUser(req,res){
    try{
        const user = req.body.user;
        
        await User.create(user);
        return res.json({message:"user created successfully"});
    }
    catch(err){
        if(err.code == 11000){
            return res.json({message:"User already exists"});
        }
        return res.json({message:err.message})
    }

}
async function deleteUser(req,res){
    try {
        const email = req.body.user.email;
        const userExists = await User.findOne({email}); 
        if(!userExists){
            return res.json({message:"User not found"});
        }
        await User.deleteOne({email});
        return res.json({message:"User deleted successfully"});

    } catch (err) {
        res.json({message:err.message})
    }
}
async function getUserProfile(req, res) {
    try {
        const email = req.user.email;

        const user = await User.findOne({email:email});

        if(!user) {
            return res.json({message:"User not found"});
        }  
        const userProfile = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            dob:user.dob,
            gender:user.gender,
            pincode:user.address.pincode,
            country:user.address.country
        }
        return res.json(userProfile);

    } catch (err) {
        res.json({message:err.message})
    }
}
async function updateUserProfile(req, res) {
    try{
        const {email,name,phone,pincode,gender,dob} = req.body;
        
        const user = await User.findOneAndUpdate(
            {email:email}, 
            {$set:{
                email:email,name:name,phone:phone,gender:gender,dob:dob,address:{pincode:pincode}
            }}
        )
        if(!user){   
            return res.status(500).json({message:"couldnt update user",user:user});
        }
        return res.json({message:"user updated successfully",user:user});

    }
    catch (err) {
        return res.json({message:err.message});
    }
}
async function getUserCart(req, res) {
    try {
        const user = req.user;
        const userCart = req.user.cart;

        if(userCart.length==0){
            return res.json({message:"cart is empty"});
        }

        const cart = await Promise.all(userCart.map(async(item)=>{
            const product = await Product.findById(item.productId)
            return ({product:product,quantity:item.quantity});
        }))
        
        return res.json(cart);    
        
    } 
    catch (error) {
        console.log(error);
        return res.json({message:error.message});
    }
}
async function getOrderHistory(req, res){
    try {
        const orders = req.user.orders;
        
        if(orders.length==0){
            return res.status(404).json({message: "No orders found"})
        }

        const updatedOrder = await Promise.all(orders.map(async(item) => {
            const orderId = item.orderId;
            const order = await Order.findOne({orderId:orderId}); 
            const products = order.products;
            
            const updatedProducts = await Promise.all(products.map(async(product) => {
                const productId = product.productId;
                const fetchedProduct = await Product.findById(productId);
                return fetchedProduct
            }))
            
            return ({orderDetails:order,productDetails:updatedProducts});
        }));
        return res.status(200).json(updatedOrder);
    } 
    catch (error) {
        return res.status(500).json({error:error});
    }
}
function getUserAddress(req, res){
    try {
        const address = req.user.address;
        if(!address) return res.json({message: 'no address available'});
        
        return res.json(address);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}
async function updateUserAddress(req, res){
    try {
        const {street,city,state,pincode,landmark} = req.body;
        const email = req.user.email;
        
        const user = await User.findOneAndUpdate(
            {email: email},
            {$set: {
                address:{
                    street:street,
                    state:state,
                    city:city,
                    pincode:pincode,
                    landmark:landmark||""
                }
            }}
        )
        if(!user) return res.status(404).json({message: 'User not found'});
        return res.status(200).json({message: "address updated"});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}
async function addPaymentMethod(req, res){
    try {
        const {cardType,cardNumber,nameOnCard,expiryDate} = req.body;
        const email = req.user.email;
        const paymentMethod = {
            cardType:cardType,
            cardNumber:cardNumber,
            nameOnCard:nameOnCard,
            expiryDate:expiryDate
        }
        
        const user = await User.findOneAndUpdate(
            {email: email},
            {$push:{paymentMethod:paymentMethod}},
        )
        if(!user) return res.status(500).json("payment method not found");
        
        return res.json({message: "payment method updated"});
    } 
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error});
    }
}
function getPaymentMethods(req, res){
    try {
        const paymentMethod = req.user.paymentMethod;
        if(!paymentMethod) return res.status().json({message: 'no payment Method available'});
        
        return res.json(paymentMethod);
    } 
    catch (error) {
        console.log(error);
        return res.json({error: error.message});
    }
}
async function updatePaymentMethod(req, res){
    try {
        const {cardType,cardNumber,nameOnCard,expiryDate} = req.body;
        const email = req.user.email;
        const paymentMethod = {
            cardType:cardType,
            cardNumber:cardNumber,
            nameOnCard:nameOnCard,
            expiryDate:expiryDate
        }
        
        const user = await User.findOneAndUpdate(
            {email: email,paymentMethod:{$elemMatch:{cardNumber:cardNumber}}},
            {$set:{paymentMethod:paymentMethod}},
        )
        if(!user) return res.status(500).json("payment method not found");
        
        return res.json({message: "payment method updated"});
    } 
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error});
    }
}
async function deletePaymentMethod(req, res) {
    try {
        const {cardNumber} = req.body;
        const email = req.user.email
        console.log(cardNumber);

        const user = await User.findOneAndUpdate(
            {email: email,paymentMethod:{$elemMatch:{cardNumber:cardNumber}}},
            {$pull:{paymentMethod:{cardNumber:cardNumber}}},
        )
        if(!user) return res.status(404).json("payment method not found");
        
        return res.json({message: "payment method updated"});
    } 
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
}
function getUserWishlist(req, res) {
    try {
        const wishlist = req.user.wishlist;
        if(wishlist.length==0) return res.json({message: 'wishlist is empty'});
    
        return res.json(wishlist);
    } 
    catch (error) {
        console.log(error.message);
        return res.json({error: error.message});
    }
}
async function updatePassword(req, res) {
    try {
        const {currentPassword,newPassword} = req.body;
        const email = req.user.email;

        const user = await User.findOne({email: email})
        if(!user) return res.status(500).json("user not found");

        bcrypt.compare(currentPassword,user.password,async(err,result)=>{
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result) {
                const encryptedNewPassword =await bcrypt.hash(newPassword,10);

                await User.updateOne({email:email},{$set:{password:encryptedNewPassword}})
            
                return res.json({message: "user password updated"});
            } 
            else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        })
    } 
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error});
    }
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
    getUserCart,
    getOrderHistory,
    getUserAddress,
    updateUserAddress,
    getUserWishlist,
    getPaymentMethods,
    updatePaymentMethod,
    addPaymentMethod,
    deletePaymentMethod,
    updatePassword
}