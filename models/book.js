const moment = require('moment')
require('mongoose-type-url')
const mongoose = require('./../lib/db')
const Schema = mongoose.Schema

// 书
const BookSchema = new Schema({
  title: { type: String, default: null }, // 标题
  cover: { type: String, default: null }, // 封面
  info: { type: String, default: null }, // 原文辅助信息
  originalId: { type: Number, default: null }, // 原始id
  size: { type: Number, default: null }, // 总页数
  uploadTime: { type: String, default: null }, // 上传日期
  createTime: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // 创建时间
  downSrc: { type: String, default: null }, // 下载地址
  href: { type: String, default: null }, // 详情页链接
  author: { type: String, default: null }, // 作者
  bookName: { type: String, default: null }, // 书名
  isNotFix: { type: Boolean, default: false }, // 是否无修正
  isCacheInfo: { type: Boolean, default: false }, // 是否已缓存详情页
  isFavorites: { type: Boolean, default: false }, // 是否收藏
  tagNames: { type: String, default: null }, // 标签名
  tagIds: { type: String, default: null } // 标签id
})

module.exports = mongoose.model('book', BookSchema)
