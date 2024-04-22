const User = require("../model/user");

async function addToCart(req, res){
    try {
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const email = req.user.email;

        if(!productId) return res.json({message:"enter product id"});

        const productExistsInCart = await User.findOne({email: email,"cart.productId":productId},{"cart.$":1})

        if(productExistsInCart){
            await User.updateOne({email:email,"cart.productId":productId},{$set: {"cart.$.quantity":quantity+productExistsInCart.cart[0].quantity}})
        }
        else{
            await User.updateOne({email:email},{$push: {cart:[{productId:productId, quantity:quantity}]}})
        }
        
        return res.json({message:"item added to cart successfully"});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
}
async function updateCart(req, res){
    try {
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const email = req.user.email;

        if(!productId) return res.json({message:"enter product id"});

        await User.updateOne({email:email},{$set:{quantity:quantity}})
        return res.json({message:"quantity updated successfully"});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
}
async function removeItemFromCart(req, res){
    try {
        const productId = req.body.productId;
        const email = req.user.email;

        if(!productId) return res.json({message:"enter product id"});

        await User.updateOne({email: email},{$pull:{cart:{productId: productId}}})
        return res.json({message:"item removed successfully"})
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
}

module.exports = {
    addToCart,
    updateCart,
    removeItemFromCart
}