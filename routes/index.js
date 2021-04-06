const bodyParser = require('body-parser')
const tool = require('./../tool')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.get('/', (req, res) => {
    // console.log('aaa', tool.utf8.decodeUtf8('%E5%A6%82%E6%9C%88%E7%BE%A4%E7%9C%9F'))
    res.render('index', { data: {} })
  })
}
