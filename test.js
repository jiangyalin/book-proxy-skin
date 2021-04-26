// 清洗下载链接
const config = require('./config/default')
const tool = require('./tool')
const moment = require('moment')
const Book = new require('./models/book')
const pageList = require('./models/page-list')

const getInfo = async () => {
  // 查询数据
  const criteria = { title: '' } // 查询条件
  const fields = { uploadTime: 1, originalId: 1 } // 待返回的字段
  const options = {} // 排序方式
  const records = await Book.find({}).skip(1 * 5)
    .limit(5)
    .sort({'originalId': 1})
    .exec()

  console.log('records', records)
}

const get = async () => {
  const $page = await getInfo()
  // console.log('$page', $page)
}

get()
