const express = require('express');
const router = express.Router();
const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controllers/productController')

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/createProduct',createProduct);
router.put('/:id/update',updateProduct);
router.delete('/:id/delete',deleteProduct);

module.exports = router;