const express = require('express')
const router = express.Router()

//middlewares
const {authCheck} = require('../middlewares/auth')
//controllers
const {createWishlist, listWishlist, removeWishlist, updateNewsletter} = require('../controllers/user')

//routes
router.get('/wishlist', authCheck, listWishlist)
router.post('/wishlist', authCheck, createWishlist)
router.put(`/wishlist/:id`, authCheck, removeWishlist)
router.put(`/newsletter`, authCheck, updateNewsletter)


module.exports = router