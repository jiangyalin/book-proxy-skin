const bodyParser = require('body-parser')
const getList = require('./../reptile/get-list')

module.exports = app => {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) // 解析参数

  app.get('/', (req, res) => {
    console.log('pp')
    getList(data => {
      res.render('index', { data })
    })
    // console.log('getList()', getList())
  })
}
