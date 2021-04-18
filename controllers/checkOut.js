const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require('../models/product')

exports.userCart = async(req, res)=>{
    try {
        let products = []
        let {cart} = req.body

        let user  = await User.findOne({email : req.user.email}).exec()
        let existingCartofUser = await Cart.findOne({orderedBy:user._id}).exec()
        if(existingCartofUser){
            existingCartofUser.remove({}, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('REMOVED OLD CART!!')
                }
            })
        }else{
            console.log('NO CART!!')
        }

        for(i =0; i<cart.length; i++){
            let object = {}
            object.product = cart[i]._id;
            object.count = cart[i].count;
            let {price} = await Product.findById(cart[i]._id).select('price').exec()
            object.price = price
            products.push(object)
        }

        let cartTotal = 0
        for(i=0; i<products.length; i++){
            cartTotal = cartTotal + products[i].price * products[i].count
        }

        let newCart = await new Cart({
            products:products,
            totalAmount:cartTotal,
            orderedBy:user._id
        }).save()

        console.log(newCart)
        res.status(200).json({'success':'true'})
    } catch (error) {
        res.status(400).json({'error':'Some Error'})
    }
}

exports.listUserCart = async(req, res)=>{
    try {
        let user  = await User.findOne({email : req.user.email}).exec()
        let cart = await Cart.findOne({orderedBy:user._id}).populate('products.product').populate('products.product[0].subs').exec()
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeUserCart = async(req, res)=>{
    try {
        let user = await User.findOne({email:req.user.email}).exec()
        let cart  = await Cart.findOneAndRemove({orderedBy:user._id}).exec()
        res.status(200).json({'success':'Your cart is successfully emptied!!'})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.userAddress = async(req, res)=>{
    try{
        let {address} = req.body
        let user = await User.findOneAndUpdate({email:req.user.email}, {address}, {new:true}).exec()
        res.status(200).json({'success':true})
    }catch(err){
        res.status(400).json(err.message)
    }
}

exports.listUserAddress = async(req, res)=>{
    try {
        let user = await User.findOne({email:req.user.email}).select('address').exec()
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err.message)
    }
}