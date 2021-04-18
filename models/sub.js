const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const subSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        index:true,
        lowercase:true,
        unique:true
    },
    category:{type:ObjectId, ref:'Category', required:true}
}, {timestamps:true})

module.exports = mongoose.model('Sub', subSchema);