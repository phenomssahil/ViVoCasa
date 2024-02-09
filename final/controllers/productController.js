const Products = require('../model/products');

async function getAllProducts(req,res){
    try{
        const products = await Products.find();
        
        if(!products){
            return res.json({message:"no products found"});
        }
        return res.json({products});
    }
    catch(err){
        res.send(err.message)
    }
}
async function getProductById(req,res){
    try{
        const id = req.params.id;
        const product = await Products.find({id});

        if(!product){
            return res.json({message: 'Product not found'});
        }
        return res.json({product})
    }
    catch(err){
        res.json({message: err.message});
    }
}
async function createProduct(req,res){
    try{
        const product = req.body;   

        const productExists = await Products.findOne(product);
        if(productExists){
            return res.json({message: 'Product already exists'});
        }

        await Products.create(product);
        return res.json({message:"Product created successfully"});
    }
    catch(err){
        res.json({message: err.message});
    }
    
}
async function updateProduct(req,res){
    try {
        const id = req.params.id;
        const product = req.body;
        
        await Products.updateOne({id:id},{$set:product})

        return res.json({message:"Product updated successfully"});
    } 
    catch (error) {
        return res.json({message: error.message});
    }
}
async function deleteProduct(req,res){
    try{
        const id = req.params.id;
        await Products.deleteMany({id});

        return res.json({message:"Product deleted successfully"}); 
    }
    catch (error) {
        return res.json({message: error.message});
    }
}
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}