// 连接数据库
const mongoose = require('mongoose')
const DB_URL = require('../config/default').mongodb

//连接
mongoose.Promise = global.Promise
mongoose.connect(DB_URL)

//连接成功
mongoose.connection.on('connected', function () {
  console.log("mongoose连接成功")
})

//连接异常
mongoose.connection.on('error', function () {
  console.log("连接异常")
  console.log('Mongoose connection error: ' + err)
})

//连接断开
mongoose.connection.on('disconnected', function () {
  console.log("连接断开")
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose
