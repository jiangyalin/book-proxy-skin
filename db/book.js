const bookDb = require('./book.json')
const fs = require('fs')
const moment = require('moment')

// 书
function book () {
  this.newBookData = {}
  this.addBook = ({ title, infoColText, href, cover }) => {
    const id = Number(href.substring(href.indexOf('aid-') + 4, href.indexOf('.'))) || null
    let json = require('./book.json')
    if (bookDb.data[id]) return true
    const book = {
      title: title || '', // 原文标题
      cover: 'https:' + cover || '', // 封面
      info: infoColText || '', // 原文辅助信息
      id,
      size: Number(infoColText.substring(0, infoColText.indexOf('張')).trim()) || null, // 总页数
      uploadTime: infoColText.substring(infoColText.indexOf('創建於') + 3).trim() || '', // 上传日期
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
      downSrc: '', // 下载地址
      href: 'https://www.wnacg.org/photos-index-aid-' + this.id + '.html', // 详情页链接
      author: title.substring(title.indexOf('[') + 1, title.indexOf(']')) || '', // 作者
      bookName: title.split('[').map(item => item.substring(item.indexOf(']') + 1)).filter(item => item).join('').trim() || '', // 书名
      isNotFix: title.includes('[無修正]') || false, // 是否无修正
      isCacheInfo: false, // 是否已缓存详情页
      isFavorites: false // 是否收藏
    }
    json.data[id] = book
    fs.writeFileSync(__dirname + '/book.json', JSON.stringify(json))
    this.newBookData = book
    return book
  }
  this.cacheInfo = ({ id, downSrc }) => {
    let json = require('./book.json')
    if (!bookDb.data[id]) return '不存在这本书'
    json.data[id].downSrc = downSrc
    json.data[id].isCacheInfo = true
    fs.writeFileSync(__dirname + '/book.json', JSON.stringify(json))
  }
  this.initData = () => {
    let json = require('./book.json')
    json.data = {}
    fs.writeFileSync(__dirname + '/book.json', JSON.stringify(json))
  }
}

module.exports = book
