const express = require('express')
const router = express.Router()

//middlewares
const {authCheck} = require('../middlewares/auth')
//controllers
const {createPayment, successPayment} = require('../controllers/payment')

//routes
router.post('/payment',authCheck, createPayment)
router.post('/payment/success', authCheck, successPayment)

module.exports = router