const express = require('express')
const router = express.Router()


//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')
//controllers
const { listCategories, createCategory, updateCategory, removeCategory, readCategory, listCategoryOnSub } = require('../controllers/category')

router.get('/category', listCategories);
router.get('/category/:slug', readCategory);
router.get('/category/sub/:id', listCategoryOnSub)
router.post('/category', authCheck, adminCheck, createCategory);
router.put('/category/update/:slug', authCheck, adminCheck, updateCategory)
router.delete('/category/:slug', authCheck, adminCheck, removeCategory)

module.exports = router;