const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    getProductBySearch,
    getProductByRoom
} 
= require('../controllers/productController');

const { isAdmin } = require('../middleware/authMiddleware');

router.route('/')
.get(getAllProducts)
.post(isAdmin,createProduct) 

router.route('/id/:id')
.get(getProductById)
.put(isAdmin,updateProduct)
.delete(isAdmin,deleteProduct)

router.get('/category/:id',getProductByCategory)
router.get('/rooms/:id',getProductByRoom)
router.get('/search',getProductBySearch)

module.exports = router;