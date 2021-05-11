const express = require('express')
const router = express.Router()
const Tag = new require('./../../models/tag')

// 新增标签
router.post('/', async (req, res) => {
  const name = req.body.name
  const tag = {
    name
  }
  const info = await Tag.findOne(tag)
  if (!info) {
    const data = await Tag.create(tag, (err, result) => {
      if (err) return console.log(err)
    })
    res.jsonp({
      code: 200,
      data: data
    })
  }
  res.jsonp({
    code: 500,
    data: {},
    msg: '此标签已存在'
  })
})

module.exports = router
