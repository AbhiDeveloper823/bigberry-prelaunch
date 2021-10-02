const User = require('../models/user')

exports.createOrUpdateUser = async(req, res)=>{
    let {email, picture} = req.user
    await User.findOneAndUpdate({email}, {email, avatar:picture}, {new:true}).then(async(result)=>{
        if(result){
            res.status(200).json(result)
        }else{
            let {address} = req.body
            let newUser = await new User({email, address, avatar:picture}).save()
            res.status(200).json(newUser)
        }
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
}

exports.currentUser = async(req, res)=>{
    let {email} = req.user
    await User.findOne({email}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(400).json({'error':err.message})
    })
}
