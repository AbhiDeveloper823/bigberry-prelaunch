const express = require('express');
const router = express.Router();

const {authCheck, adminCheck} = require('../middlewares/auth');
const { listCoupon, readCoupon, createCoupon, updateCoupon, removeCoupon, applyCoupon } = require('../controllers/coupon')

router.get('/coupons', authCheck, adminCheck, listCoupon)
router.get('/coupon/:slug', authCheck, adminCheck, readCoupon)
router.post('/coupon', authCheck, adminCheck, createCoupon)
router.put('/coupon/:slug', authCheck, adminCheck, updateCoupon)
router.delete('/coupon/:slug',authCheck, adminCheck, removeCoupon )

//APPLY COUPON
router.post('/coupon/apply', authCheck, applyCoupon)

module.exports = router;