const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: 'subscriber'
    },
    address: {
        type: Object
    },
    newsletter: Boolean,
    wishlist:[
        {
            type:ObjectId,
            ref:'Product'
        }
    ]
}, {timestamps:true})

module.exports = mongoose.model('User', userSchema);