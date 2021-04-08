const listDb = require('./list.json')
const bookDb = require('./book.json')
const fs = require('fs')
const moment = require('moment')
// 全量列表
function list () {
  this.addList = ({ bookId, uploadTime }) => {
    let json = require('./list.json')
    if (require('./list.json').data.find(item => item.bookId === bookId)) return true
    json.data.splice(json.data.findIndex(item => item.createTime === uploadTime), 0, {
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      uploadTime,
      bookId
    })
    fs.writeFileSync(__dirname + '/list.json', JSON.stringify(json))
  }
  this.getAll = () => {
    return require('./list.json').data.map(item => {
      return {
        ...item,
        book: require('./book.json').data[item.bookId]
      }
    })
  }
  this.initData = () => {
    let json = require('./list.json')
    json.data = []
    fs.writeFileSync(__dirname + '/list.json', JSON.stringify(json))
  }
}

module.exports = list
