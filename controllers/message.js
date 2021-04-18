const Message = require('../models/message')

exports.listMessage = async(req, res)=>{
    try {
        const messages = await Message.find({}).exec()
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({'error':error.Message})
    }
}


exports.createMessage = async(req, res)=>{
    try {
        const message = await new Message(req.body.body).save()
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({'error':error.Message})
    }
}

exports.readMessage = async(req, res)=>{
    try {
        let {id} = req.params
        const message = await Message.findById(id).exec()
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({'error':error.Message})
    }
}

exports.removeMessage = async(req, res)=>{
    try {
        let {id} = req.params
        let remove = await Message.findByIdAndRemove(id).exec()
        res.status(200).json(remove)
    } catch (error) {
        res.status(400).json({'error':error.Message})
    }
}