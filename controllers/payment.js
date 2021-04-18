const Razorpay = require('razorpay')
const crypto = require('crypto')
const User = require('../models/user')
const Cart = require('../models/cart')
const uniqid = require('uniqid')
require('dotenv').config()

exports.createPayment = async(req, res)=>{
    try {
        const instance = new Razorpay({
            key_id:process.env.RAZORPAY_API_KEY,
            key_secret:process.env.RAZORPAY_API_SECRET
        })
        const {coupon} = req.body
        const user = await User.findOne({email:req.user.email}).exec()
        const {address, email} = user
        const {firstName, phoneNumber} = address
        const cart = await Cart.findOne({orderedBy:user._id}).exec()

        let finalAmount = 0
        if(coupon){
            finalAmount = cart.totalAmountAfterDiscount * 100
        }else{
            finalAmount = cart.totalAmount * 100
        }

        const options = {
            amount : finalAmount,
            currency : 'INR',
            receipt: uniqid('bigberry-'),
        }

        const order = await instance.orders.create(options)
        res.status(200).json({order, user})
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
}

exports.successPayment = async(req, res)=>{
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            amount,
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

            let razorResponse = {
                amount,
                order_id:orderCreationId,
                status: "success",
                payment_method:'RazorPay',
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
            }
            console.log('RESPONSE TO BE SEND>>>', razorResponse)
            req.razorResponse = razorResponse
            

        res.status(200).json({'Payment':'Thank You...Payment Is Successfuly Done!!', 'Response':razorResponse})
    } catch (error) {
        res.status(500).send(error);
    }
}