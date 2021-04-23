// 合并数据
const config = require('./../config/default')
const tool = require('./../tool')
const moment = require('moment')
const Book = new require('./../models/book')
const pageList = require('./../models/page-list')

const getList = async page => {
  // 查询数据
  // const page = Number(0) + 1 // 当前页码
  const pageSize = Number(10) // 每页条数
  const qs = new RegExp('') // 标题正则参数
  const Model = Book // 模板
  const populate = ''
  const criteria = { isCacheInfo: false, $or: [{ title: qs }, { name: qs }] } // 查询条件
  let fields = { originalId: 1, size: 1, uploadTime: 1, createTime: 1, downSrc: 1, href: 1, isNotFix: 1, isCacheInfo: 1, isFavorites: 1 } // 待返回的字段
  const options = { sort: [{ originalId: -1 }] } // 排序
  return pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options)
}

const get = async () => {
  const $page = await getList(1)
  const data = {
    total: $page.count,
    rows: $page.results
  }
  console.log('data', data.rows)
}

get()
