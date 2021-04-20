// 读取本地json导入到mongodb
const express = require('express')
const fs = require('fs')
const router = express.Router()
const Book = new require('./../models/book')
const moment = require('moment')

const search = (condition = [], showImg = false, isRedundancy = false) => {
  const node = []
  let max = 0
  for (let i = 0; i < 8000; i++) {
    const path = './../../book-down/data/' + moment().add(-i, 'days').format('YYYY-MM-DD') + '.json'
    let list = { node: [] }
    if (fs.existsSync(path)) list = JSON.parse(fs.readFileSync(path, 'utf8'))
    node.push(...list.node.map(item => {
      max += item.node.length
      return {
        ...item,
        node: showImg ? item.node : null
      }
    }))
  }
  console.log('kk')

  return node
}

const list = search()

let i = 0

const add = () => {
  const data = list[i]
  const book = {
    title: data.title, // 标题
    cover: data.cover, // 封面
    info: data.info, // 原文辅助信息
    originalId: Number(data.id), // 原始id
    size: Number(data.size), // 总页数
    uploadTime: data.date, // 上传日期
    downSrc: data.downSrc, // 下载地址
    href: 'https://www.wnacg.org/photos-index-aid-' + data.id + '.html', // 详情页链接
    author: data.title.substring(data.title.indexOf('[') + 1, data.title.indexOf(']')) || '', // 作者
    bookName: data.title.split('[').map(item => item.substring(item.indexOf(']') + 1)).filter(item => item).join('').trim() || '', // 书名
    isNotFix: data.title.includes('[無修正]'), // 是否无修正
    isCacheInfo: false, // 是否已缓存详情页
    isFavorites: false // 是否收藏
  }
  Book.create(book, (err, result) => {
    if (err) return console.log(err)
    console.log('ok')
    i++
    add()
  })
}

add()
