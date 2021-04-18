const express = require('express')
const router = express.Router()


//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')
//controllers
const { listBlog, readBlog, createBlog, updateBlog, removeBlog, listBlogCount, listAllBlogs } = require('../controllers/blog')

router.post('/blogs', listBlog);
router.get('/blogs/all', listAllBlogs)
router.get('/blogs/count', listBlogCount);
router.get('/blog/:slug', readBlog);
router.post('/blog', authCheck, adminCheck,createBlog);
router.put('/blog/update/:slug', authCheck, adminCheck, updateBlog)
router.delete('/blog/:slug', authCheck, adminCheck, removeBlog)

module.exports = router;