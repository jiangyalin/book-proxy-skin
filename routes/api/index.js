const express = require('express')
const router = express.Router()

// 收藏
router.use('/favorites', require('./favorites'))

module.exports = router
