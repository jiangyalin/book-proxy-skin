const express = require('express')
const router = express.Router()

// 收藏
router.use('/favorites', require('./favorites'))

// 下载
router.use('/down', require('./down'))

// 书
router.use('/book', require('./book'))

// 书
router.use('/shut-down', require('./shut-down'))

module.exports = router
