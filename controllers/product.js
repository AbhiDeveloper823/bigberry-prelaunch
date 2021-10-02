const Product = require('../models/product')
const slugify = require('slugify')
const User = require('../models/user')

// exports.listProducts = async(req, res)=>{
//     try {
//         let products;
//         if(req.query.count){
//             let count = Number(req.query.count)
//             products = await Product.find({}).limit(count).sort({'cratedAt':-1}).exec()
//         }else{
//             products = await Product.find({}).exec()
//         }
//         res.status(200).json(products)
//     } catch (error) {
//         res.status(400).json({'error': 'Unable To Get All The Products!'})
//     }
// }

exports.listProducts = async(req, res)=>{
    try {
        let {sort, order, page} = req.body
        let currentPage = page || 1
        let perPage = 9

        let products  = await Product.find({})
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .sort([[sort,order]])
        .exec()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({'error': 'Unable To Get All The Products!'})
    }
}

exports.listProductsCount = async(req, res)=>{
    try{
        let count = await Product.find({}).estimatedDocumentCount().exec()
        res.status(200).json(count)
    }catch(err){
        res.status(400).json(err.message)

    }
}

exports.readProduct = async(req, res)=>{
    try {
        let {slug} = req.params
        let product = await Product.findOne({slug}).populate('category').populate('subs').populate('ratings.postedBy', 'address').exec()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({'error': 'Unable To get the information of the related Products!!'})
    }
}

exports.createProduct = async(req, res)=>{
    try {
        let {title} = req.body
        req.body.slug = slugify(title)
        let newProduct = await new Product(req.body).save()
        res.status(200).json(newProduct)
    } catch (error) {
        res.status(400).json({'error': 'Unable to create the new Product!!'})
    }
}

exports.updateProduct = async(req, res)=>{
    try {
        let {slug} = req.params
        let {title} = req.body
        req.body.slug = slugify(title)
        let updated = await Product.findOneAndUpdate({slug}, req.body, {new:true}).exec()
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json({'error': 'Product was not updated....Try Again!!'})
    }
}

exports.removeProduct = async(req, res)=>{
    try {
        let {slug} = req.params
        let deleted = await Product.findOneAndRemove({slug}).exec()
        res.status(200).json({'success': `${slug} is successfully deleted!!`})
    } catch (error) {
        res.status(400).json({'error': `${slug} was not deleted...Try Again!!`})
    }
}

exports.listRelatedProduct = async(req, res)=>{
    let {productId} = req.params
    let product = await Product.findById(productId).exec()
    let related = await Product.find({
        _id:{$ne:productId},
        category:product.category
    }).exec()
    res.status(200).json(related)
}

//RATING
exports.rateProduct = async(req, res)=>{
    let {star, comment} = req.body
    let product = await Product.findById(req.params.id).exec()
    let user = await User.findOne({email:req.user.email}).exec()

    let existingRateObj = product.ratings.find((ele)=>(ele.postedBy).toString() === (user._id).toString())

    if(existingRateObj === undefined){
        let newRate = await Product.findByIdAndUpdate(req.params.id, {
            $push:{ratings:{star, postedBy:user._id, comment}}
        }, {new:true}).exec()
        res.status(200).json(newRate)
    }else{
        let updateRate = await Product.updateOne(
            {ratings: {$elemMatch:existingRateObj}},
            {$set:{'ratings.$.star':star, 'ratings.$.comment':comment}},
            {new:true}
        )
        res.status(200).json(updateRate)
    }

}

//FILTERS
const handleCategory = async(req, res, category)=>{
    let products = await Product.find({category:category}).populate('subs').populate('category').exec()
    res.status(200).json(products)
}

const handleSub = async(req, res, sub)=>{
    let products = await Product.find({subs:sub}).populate('subs').populate('category').exec()
    res.status(200).json(products)
}

const handlePrice = async(req, res, price)=>{
    let products = await Product.find({price : {$lt:price[1], $gt:price[0]}}).populate('subs').populate('category').exec()
    res.status(200).json(products)
}

const handleShipping = async(req, res, shipping)=>{
    let products = await Product.find({shipping}).populate('subs').populate('category').exec()
    res.status(200).json(products)
}

const handleSort = async(req, res, sort)=>{
    let products = await Product.find({}).sort({price:sort}).populate('subs').populate('category').exec()
    res.status(200).json(products)
}

exports.filterProducts = async(req, res)=>{
    let {category, sub, price, shipping, sort} = req.body
    if(category){
        await handleCategory(req, res, category)
    }else if(sub){
        await handleSub(req, res, sub)
    }else if(price){
        await handlePrice(req, res, price)
    }else if(shipping){
        await handleShipping(req, res, shipping)
    }else if(sort){
        await handleSort(req, res, sort)
    }
}