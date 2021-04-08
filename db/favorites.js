const favoritesDb = require('./favorites.json')
const bookDb = require('./book.json')
const fs = require('fs')
const moment = require('moment')
// 收藏
function favorites() {
  this.addFavorites = (bookId) => {
    let json = favoritesDb
    if (favoritesDb.data.find(item => item.id === book.id)) return true
    json.data.push({
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      bookId
    })
    fs.writeFileSync('./db/favorites.json', JSON.stringify(json))
  }
  this.getAll = () => {
    return favoritesDb.data.map(item => {
      return {
        ...item,
        book: bookDb.data[item.bookId]
      }
    })
  }
}

module.exports = favorites
