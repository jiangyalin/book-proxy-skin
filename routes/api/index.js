const express = require('express')
const router = express.Router()

// 收藏
router.use('/favorites', require('./favorites'))

// 下载
router.use('/down', require('./down'))

// 下载
router.use('/book', require('./book'))

module.exports = router
