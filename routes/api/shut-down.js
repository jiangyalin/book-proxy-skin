const express = require('express')
const router = express.Router()
const ShutDown = new require('./../../models/shut-down')
const pageList = require('./../../models/page-list')
const moment = require('moment')

// 关注
router.get('/list', async (req, res) => {
  const page = Number(req.query.currentPage) || 1 // 当前页码
  const pageSize = Number(999) // 每页条数
  const Model = ShutDown // 模板
  const populate = '' // 外键
  const criteria = { } // 查询条件
  const fields = { name: 1, type: 1, alias: 1, rating: 1, remark: 1 } // 待返回的字段
  const sort = { rating: -1 } // 排序
  const $page = await pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, sort)
  const data = {
    total: $page.count,
    currentPage: page,
    rows: $page.results.map(item => {
      return {
        ...item,
        name: item.name.substring(0, 1) + '这是测试数据',
        remark: item.remark.substring(0, 1) + '这是测试数据'
      }
    })
  }
  res.jsonp({
    code: 200,
    data: data
  })
})

module.exports = router
