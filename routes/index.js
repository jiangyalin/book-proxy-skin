const bodyParser = require('body-parser')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.get('/', (req, res) => {
    res.render('index', { data: {} })
  })
}
