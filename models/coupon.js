const mongoose = require('mongoose')

const couponScehma = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true
    },
    expiry:Date,
    discountRate :{
        type:Number,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Coupon', couponScehma)