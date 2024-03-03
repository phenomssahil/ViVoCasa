const Products = require('../model/products');

async function createProduct(req,res){
    try{
        const product = req.body.products;   
        
        await Products.create(product);
        return res.json({message:"Product created successfully"});
    }
    catch(err){
        if(err.code == 11000){
            return res.json({message:"Product already exists"})
        }
        res.json({message: err.message});
    }
}
async function updateProduct(req,res){
    try {
        const productId = req.params.id;
        const product = req.body;
        
        await Products.updateOne({productId:productId},{$set:product})
        return res.json({message:"Product updated successfully"});
    } 
    catch (error) {
        return res.json({message: error.message});
    }
}
async function deleteProduct(req,res){
    try{
        const productId = req.params.id;
        const product = await Products.findOne({productId})

        if(!product) return res.status(404).json({message: "Product not found"});
        
        await Products.deleteMany({productId});

        return res.json({message:"Product deleted successfully"}); 
    }
    catch (error) {
        return res.json({message: error.message});
    }
}
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
        const productId = req.params.id;
        const product = await Products.find({productId});

        if(!product){
            return res.json({message: 'Product not found'});
        }
        return res.json({product})
    }
    catch(err){
        res.json({message: err.message});
    }
}
async function getProductByCategory(req,res){
    try {
        const id = req.params.id;
        const products = await Products.find({category:id});

        return res.json(products);
    } 
    catch (error) {
        return res.json({message: error.message});    
    }
}
async function getProductBySearch(req,res){
    try {
        const {keyword} = req.query;

        const regex = new RegExp(keyword,'i');

        const product = await Products.find({$or:[{title:regex},{description:regex}]})

        return res.json(product);
    } 
    catch (error) {
        console.log(error.message);
        return res.json({message: error.message});
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    getProductBySearch
}