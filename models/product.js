const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:52,
        text:true
    },
    slug:{
        type:String,
        unique:true,
        index:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
        maxlength:3000,
        text:true
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    category:{
        type:ObjectId,
        ref:'Category'
    },
    subs:[
        {
            type:ObjectId,
            ref:'Sub'
        }
    ],
    quantity:{
        type:Number,
        required:true,
        trim:true
    },
    sold:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
    },
    shipping:{
        type:String,
        enum:['Yes', 'No']
    }, 
    ratings:[
        {
            star: Number,
            comment:String,
            postedBy: {type:ObjectId, ref:'User'}
        }
    ]
})

module.exports = mongoose.model('Product', productSchema)