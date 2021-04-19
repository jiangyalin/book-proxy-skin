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
    list: 'https://www.wnacg.org'
  }
}
