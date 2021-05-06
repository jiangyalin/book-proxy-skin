const moment = require('moment')
require('mongoose-type-url')
const mongoose = require('./../lib/db')
const Schema = mongoose.Schema

// 标签
const Tag = new Schema({
  name: { type: String, default: null }, // 名
  total: { type: Number, default: 0 }, // 总计
  createTime: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') } // 创建时间
})

module.exports = mongoose.model('tag', Tag)
