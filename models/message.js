const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    Subject:String,
    Message:String
}, {timestamps:true})

module.exports = mongoose.model('Message', messageSchema)