const moment = require('moment')
require('mongoose-type-url')
const mongoose = require('./../lib/db')
const Schema = mongoose.Schema

// 关注
const ShutDown = new Schema({
  name: { type: String, default: null }, // 名
  type: { type: String, default: null }, // 类（作者，组）
  alias: { type: String, default: null }, // 别名
  rating: { type: Number, default: 1 }, // 评级(1-5)
  remark: { type: String, default: null }, // 备注
  createTime: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') } // 创建时间
})

module.exports = mongoose.model('shut-down', ShutDown)
