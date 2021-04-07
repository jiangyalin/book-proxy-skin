const bodyParser = require('body-parser')
const getList = require('./../reptile/get-list')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.get('/', (req, res) => {
    // getList(data => {
    //   res.render('index', { data })
    // })
    res.render('index', { data: [{
        title: '这是标题',
        href: 'href',
        cover: 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
        page: 5,
        createTime: '2021-02-02',
        author: '这是作者',
        bookName: '这是书名',
        isNotFix: 'false'
      }, {
        title: '这是标题',
        href: 'href',
        cover: 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
        page: 5,
        createTime: '2021-02-02',
        author: '这是作者',
        bookName: '这是书名',
        isNotFix: 'false'
      }, {
        title: '这是标题',
        href: 'href',
        cover: 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
        page: 5,
        createTime: '2021-02-02',
        author: '这是作者',
        bookName: '这是书名',
        isNotFix: 'false'
      }, {
        title: '这是标题',
        href: 'href',
        cover: 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
        page: 5,
        createTime: '2021-02-02',
        author: '这是作者',
        bookName: '这是书名',
        isNotFix: 'false'
      }, {
        title: '这是标题',
        href: 'href',
        cover: 'http://124.70.153.221:9998/ftppic/2021/20210305100759585.jpg',
        page: 5,
        createTime: '2021-02-02',
        author: '这是作者',
        bookName: '这是书名',
        isNotFix: 'false'
      }] })
    // console.log('getList()', getList())
  })
}
