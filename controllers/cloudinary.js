const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

exports.uploadImage = async(req, res)=>{
    try {
        let uploaded = await cloudinary.uploader.upload(req.body.image, {
            public_id:Date.now(),
            resource_type:'auto'
        })
        res.status(200).json({
            public_id:uploaded.public_id,
            url:uploaded.secure_url
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeImage = async(req, res)=>{
    try {
        let {image_id} = req.body
        let result = await cloudinary.uploader.destroy(image_id)
        res.status(200).json({'success':'Image is successfully removed!!'})
    } catch (error) {
        res.status(400).json({'error':'Error while removing Image...Try Again!!'})
    }
}