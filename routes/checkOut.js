const express = require('express');
const router = express.Router();

const {authCheck} = require('../middlewares/auth');
const {userCart, listUserCart, userAddress, listUserAddress, removeUserCart} = require('../controllers/checkOut')

//ADDRESS
router.get('/user/address/list', authCheck, listUserAddress)
router.post('/user/address', authCheck, userAddress)

//CART
router.get('/user/cart/list', authCheck, listUserCart);
router.post('/user/cart', authCheck, userCart);
router.delete('/user/cart/remove', authCheck, removeUserCart)


module.exports = router;