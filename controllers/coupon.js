const Coupon = require('../models/coupon')
const slugify = require('slugify')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.createCoupon = async(req, res)=>{
    try {
        console.log('COUPON>>>', req.body)
        let {coupon} = req.body
        coupon.slug = slugify(coupon.title)
        let newCoupon = await new Coupon({...coupon}).save()
        res.status(200).json(newCoupon)
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
}

exports.listCoupon = async(req, res)=>{
    try {
        let coupons = await Coupon.find({}).sort({'createdAt': -1}).exec()
        res.status(200).json(coupons)
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
}

exports.readCoupon = async(req, res)=>{
    try {
        let {slug} = req.params
        let coupon = await Coupon.findOne({slug}).exec()
        res.status(200).json(coupon)
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
}

exports.updateCoupon = async(req, res)=>{
    try {
        let {coupon} = req.body
        let {slug} = req.params
        coupon.slug = slugify(coupon.title)
        let updated = await Coupon.findOneAndUpdate({slug}, {...coupon}, {new:true}).exec()
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
}

exports.removeCoupon = async(req, res)=>{
    try {
        let {slug} = req.params
        let removed = await Coupon.findOneAndRemove({slug}).exec()
        res.status(200).json({'success': 'true'})
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
}

exports.applyCoupon = async(req, res)=>{
    let {title} = req.body
    let coupon = await Coupon.findOne({title}).exec()
    if(coupon){
        let user = await User.findOne({email:req.user.email}).exec()
        let cart = await Cart.findOne({orderedBy:user._id}).exec()
        let cartTotal = cart.totalAmount
        let discountGiven = (coupon.discountRate / 100) * cartTotal
        let finalAmount = cartTotal - ( (coupon.discountRate/100) * cartTotal )
        await Cart.findOneAndUpdate({orderedBy:user._id}, {totalAmountAfterDiscount:finalAmount}, {new:true}).exec((err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).json({finalAmount, discountGiven})
            }
        })
    }else{
        res.status(400).json({'error':'Coupon is not Valid!!'})
    }
}