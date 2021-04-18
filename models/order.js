const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    products : [
        {
            product:{
                type:ObjectId,
                ref:'Product'
            },
            count:Number
        }
    ],
    deliveryStatus:{
        type:String,
        default:'Not Proccessed', 
        enum:['Not Proccessed', 'Proccessing', 'Out for Delivery', 'Delivered', 'Cancelled']
    },
    paymentStatus:{
        type:String, 
        enum:['Cash On Delivery', 'Paid']
    },
    orderedBy:{type:ObjectId, ref:'User'},
    paymentIntent : {},
}, {timestamps:true})

module.exports = mongoose.model('Order', orderSchema)