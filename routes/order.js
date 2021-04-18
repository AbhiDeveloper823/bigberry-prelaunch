const express = require('express')
const router = express.Router()

//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')
//controllers
const {createOrder, createOrderWithCOD, listAllOrders, readOrder, updateOrder, listUserOrder} = require('../controllers/order')

//routes
router.post('/orders', authCheck, listAllOrders)
router.get('/user/orders', authCheck, listUserOrder)
router.get('/order/:id', authCheck, readOrder)
router.put('/order/update/:id', authCheck, adminCheck, updateOrder)
router.post('/order',authCheck, createOrder)
router.post('/order/cod', authCheck, createOrderWithCOD)

module.exports = router