const express = require('express')
const router = express.Router()

const { listMessage, removeMessage, readMessage, createMessage } = require('../controllers/message')

//routes
router.get('/messages', listMessage)
router.post('/message', createMessage)
router.get('/message/:id', readMessage)
router.delete('/message/:id', removeMessage)

module.exports = router