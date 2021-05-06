const bodyParser = require('body-parser')
const Book = new require('./../models/book')
const pageList = require('./../models/page-list')
const moment = require('moment')
// const getList = require('./../reptile/get-list')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.use('/api', require('./api'))

  // 列表
  app.get('/list', async (req, res) => {
    res.render('list', {})
  })

  // 收藏
  app.get('/favorites', async (req, res) => {
    const type = req.query.type || 'NOT_IMG' // (NOT_IMG,SHOW_IMG)
    // 查询数据
    const page = Number(req.query.currentPage) || 1 // 当前页码
    const pageSize = Number(12) // 每页条数
    const Model = Book // 模板
    const populate = '' // 外键
    const criteria = { isFavorites: true } // 查询条件
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

    res.render('favorites', data)
  })

  // 关注
  app.get('/shut-down', async (req, res) => {
    res.render('shut-down')
  })
}
