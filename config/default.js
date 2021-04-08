// mongodb配置文件
module.exports = {
  port: 8087,
  session: {
    secret: 'personalDB',
    key: 'personalDB',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/personalDB',
  page: {
    list: 'https://www.wnacg.org/?ctl=albums&page=1&sname=%E5%A6%82%E6%9C%88%E7%BE%A4%E7%9C%9F'
  }
}
