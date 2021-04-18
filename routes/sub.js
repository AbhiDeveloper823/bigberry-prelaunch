const express = require('express')
const router = express.Router()

//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')
//controllers
const { listSubs, readSub, updateSub, createSub, removeSub } = require('../controllers/sub')

router.get('/subs', listSubs)
router.get('/sub/:slug', readSub)
router.post('/sub', authCheck, adminCheck, createSub)
router.put('/sub/update/:slug', authCheck, adminCheck, updateSub)
router.delete('/sub/:slug', authCheck, adminCheck, removeSub)

module.exports = router