const express = require('express')
const router = express.Router()
const Book = new require('./../../models/book')
const pageList = require('./../../models/page-list')
const moment = require('moment')

// 收藏
router.get('/list', async (req, res) => {
  const type = req.query.type || 'NOT_IMG' // (NOT_IMG,SHOW_IMG)
  // 查询数据
  const page = Number(req.query.currentPage) || 1 // 当前页码
  const pageSize = Number(12) // 每页条数
  const qs = new RegExp('') // 标题正则参数
  const Model = Book // 模板
  const populate = '' // 外键
  const criteria = { $or: [{ title: qs }, { name: qs }] } // 查询条件
  const fields = { title: 2, bookName: 1, author: -1, createTime: 1, downSrc: 1, isFavorites: 1, originalId: 1 } // 待返回的字段
  const sort = { originalId: -1 } // 排序
  const $page = await pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, sort)
  const data = {
    total: $page.count,
    currentPage: page,
    rows: $page.results.map(item => ({
      ...item,
      cover: 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
      title: item.title.substring(0, 2) + '这是测试标题',
      bookName: item.bookName.substring(0, 2) + '这是测试书名',
      downSrc: item.downSrc,
      createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
      isFavorites: item.isFavorites,
      originalId: item.originalId
    }))
  }
  res.jsonp({
    code: 200,
    data: data
  })
})

module.exports = router
