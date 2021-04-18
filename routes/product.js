const express = require('express')
const router = express.Router()


//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')
//controllers
const { listProducts, readProduct, createProduct, updateProduct, removeProduct, listRelatedProduct, filterProducts, listProductsCount, rateProduct } = require('../controllers/product')

router.post('/products', listProducts);
router.get('/products/count', listProductsCount)
router.get('/product/:slug', readProduct);
router.post('/product', authCheck, adminCheck, createProduct);
router.put('/product/update/:slug', authCheck, adminCheck, updateProduct)
router.delete('/product/:slug', authCheck, adminCheck, removeProduct)

//rate
router.post('/product/rate/:id', authCheck, rateProduct)

//related
router.get('/product/related/:productId', listRelatedProduct)

//filters
router.post('/product/filters', filterProducts)

module.exports = router;