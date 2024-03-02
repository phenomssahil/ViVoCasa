const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByCategory
} = require('../controllers/productController')

router.route('/')
.get(getAllProducts)
.post(createProduct)

router.route('/:id')
.get(getProductById)
.put(updateProduct)
.delete(deleteProduct)

router.get('/category/:id',getProductByCategory)

module.exports = router;