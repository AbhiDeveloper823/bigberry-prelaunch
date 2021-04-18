const admin = require('../firebase/fbserver')
const User = require('../models/user')

exports.authCheck = async(req, res, next)=>{
    let {authtoken} = req.headers
    await admin.auth().verifyIdToken(authtoken).then((result)=>{
        req.user = result
        next()
    }).catch((err)=>{
        res.status(400).json({'error':'You are not log in!!'})
    })
}

exports.adminCheck = async(req, res, next)=>{
    let {email} = req.user
    await User.findOne({email}).then((user)=>{
        if(user.role === 'admin'){ next(); }
        else{res.status(400).json({'error':'Unauthorized....Admin Content!!'})}
    })
}