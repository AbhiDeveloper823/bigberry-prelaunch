const User = require('../models/user')

exports.createWishlist = async(req, res)=>{
    try {
        let {productId} = req.body
        const wishlist = await User.findOneAndUpdate({email:req.user.email}, {$addToSet:{wishlist:productId}}, {new:true}).exec()
        res.status(200).json(wishlist)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.listWishlist = async(req, res)=>{
    try {
        let product = await User.findOne({email:req.user.email}).select('wishlist').populate('wishlist').populate('category').exec()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeWishlist = async(req, res)=>{
    try {
        const {id} =req.params
        await User.findOneAndUpdate({email:req.user.email}, {$pull: {wishlist : id}}, {new:true})
        res.status(200).json({ok:true})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.updateNewsletter = async(req, res)=>{
    try {
        const {newsletter} = req.body
        const user = await User.findOneAndUpdate({email:req.user.email}, {newsletter}, {new:true})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}