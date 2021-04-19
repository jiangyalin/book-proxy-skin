const bodyParser = require('body-parser')
const getList = require('./../reptile/get-list')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.get('/', (req, res) => {
    console.log('bbb')
    res.render('index')
  })

  app.get('/list', (req, res) => {
    const type = req.query.type || 'NOT_IMG' // (NOT_IMG,SHOW_IMG)
    const currentPage = Number(req.query.currentPage) || 1
    const pageSize = 12
    getList({
      currentPage,
      search: '如月群真'
    }, data => {
      res.render('list', {
        data: data.map(item => {
          return {
            ...item.book,
            cover: type === 'NOT_IMG' ? '' : 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
          }
        }),
        page: {
          currentPage: currentPage
        }
      })
    })
    // res.render('list', {
    //   data: [{
    //     title: '这是标题',
    //     href: 'href',
    //     cover: type === 'NOT_IMG' ? '' : 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
    //     page: 5,
    //     createTime: '2021-02-02',
    //     author: '这是作者',
    //     bookName: '这是书名',
    //     isNotFix: 'false'
    //   }, {
    //     title: '这是标题',
    //     href: 'href',
    //     cover: type === 'NOT_IMG' ? '' : 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
    //     page: 5,
    //     createTime: '2021-02-02',
    //     author: '这是作者',
    //     bookName: '这是书名',
    //     isNotFix: 'false'
    //   }, {
    //     title: '这是标题',
    //     href: 'href',
    //     cover: type === 'NOT_IMG' ? '' : 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
    //     page: 5,
    //     createTime: '2021-02-02',
    //     author: '这是作者',
    //     bookName: '这是书名',
    //     isNotFix: 'false'
    //   }, {
    //     title: '这是标题',
    //     href: 'href',
    //     cover: type === 'NOT_IMG' ? '' : 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
    //     page: 5,
    //     createTime: '2021-02-02',
    //     author: '这是作者',
    //     bookName: '这是书名',
    //     isNotFix: 'false'
    //   }, {
    //     title: '这是标题',
    //     href: 'href',
    //     cover: type === 'NOT_IMG' ? '' : 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
    //     page: 5,
    //     createTime: '2021-02-02',
    //     author: '这是作者',
    //     bookName: '这是书名',
    //     isNotFix: 'false'
    //   }],
    //   page: {
    //     currentPage: currentPage
    //   }
    // })
    // console.log('getList()', getList())
  })
}
