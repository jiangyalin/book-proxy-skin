const express = require('express')
const router = express.Router()
const Book = new require('./../../models/book')

// 收藏
router.post('/:id', async (req, res) => {
  // 查询数据
  const book = await Book.findOne({ _id: req.params.id }, { isFavorites: 1 }, {})

  const update = { $set: { isFavorites: !book._doc.isFavorites } } // 修改项
  // 更新数据
  const upBook = await Book.update({ _id: req.params.id }, update, {})
  res.jsonp({
    code: 200,
    data: upBook
  })
})

module.exports = router
