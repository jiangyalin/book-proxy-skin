// 查询book
const Book = new require('./../models/book')
const pageList = require('./../models/page-list')

const getList = () => {
  // 查询数据
  const page = Number(0) + 1 // 当前页码
  const pageSize = Number(10) // 每页条数
  const qs = new RegExp('') // 标题正则参数
  const Model = Book // 模板
  const populate = ''
  const criteria = { isNotFix: true, $or: [{ title: qs }, { name: qs }] }//查询条件
  let fields = { title: 2, description: 1, date: -1 } // 待返回的字段
  const options = { sort: [{ date: -1 }] } // 排序
  const $page = pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options)
  const data = {
    total: $page.count,
    rows: $page.results
  }
  console.log('data', data)
}

const getInfo = () => {
  // 查询数据
  const criteria = { originalId: '91678' } // 查询条件
  const fields = { title: 1, info: 1 } // 待返回的字段
  const options = {} // 排序方式
  Book.findOne(criteria, fields, options, (err, result) => {
    if (err) return console.log(err)

    const data = {
      ...result._doc,
      id: result._id
    }
    console.log('data', data)
  }).populate({ path: 'label_id', select: ['name'] })
}

getInfo()
