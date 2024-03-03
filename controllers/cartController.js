const User = require("../model/user");

async function addToCart(req, res){
    try {
        const productId = req.body.productId;
        const qty = req.body.qty;
        const email = req.body.email;

        if(!productId) return res.json({message:"enter product id"});
        
        await User.updateOne({email:email},{$push: {cart:[{productId:productId, quantity:qty}]}})
        return res.json({message:"item added to cart successfully"});
    } 
    catch (error) {
        console.log(error);
        return res.json({error:error.message})
    }
}
async function updateCart(req, res){
    try {
        const productId = req.body.productId;
        const qty = req.body.qty;
        const email = req.user.email;

        if(!productId) return res.json({message:"enter product id"});

        await User.updateOne({email:email},{$set:{quantity:qty}})
        return res.json({message:"quantity updated successfully"});
    } 
    catch (error) {
        console.log(error);
        return res.json({error:error.message})
    }
}
async function removeItemFromCart(req, res){
    try {
        const productId = req.body.productId;
        const email = req.user.email;

        if(!productId) return res.json({message:"enter product id"});

        await User.updateOne({email: email},{$unset:{productId: productId}})
        return res.json({message:"item removed successfully"})
    } 
    catch (error) {
        console.log(error);
        return res.json({error:error.message})
    }
}

module.exports = {
    addToCart,
    updateCart,
    removeItemFromCart
}