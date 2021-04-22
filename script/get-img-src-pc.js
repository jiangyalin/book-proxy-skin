// 抓取网页上的book信息并入库
const { By } = require('selenium-webdriver')
const selenium = require('./../reptile/selenium')
const config = require('./../config/default')
const tool = require('./../tool')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const moment = require('moment')
const Book = new require('./../models/book')
const chrome = selenium.create(true)

const get = async ({ search = '', currentPage = 1 }, callback = () => {}) => {
  try {
    await chrome.get(config.page.list + '/?ctl=albums&page=' + currentPage + '&sname=' + tool.utf8.encodeUtf8(search))
    // await chrome.get('http://www.baidu.com')

    let html = await chrome.getPageSource()

    let window = new jsDom(html).window
    let $ = jquery(window)

    const domBox = $('body ul.cc li.gallary_item')
    const list = []
    for (let i = 0; i < domBox.length; i++) {
      const dom = domBox.eq(i)
      const infoColText = dom.find('.info_col').text()
      const title = dom.find('a').attr('title')
      const href = dom.find('a').attr('href')
      const cover = dom.find('img').attr('src')
      const id = Number(href.substring(href.indexOf('aid-') + 4, href.indexOf('.'))) || null

      list.push({
        title: title || '', // 原文标题
        cover: 'https:' + cover || '', // 封面
        info: infoColText || '', // 原文辅助信息
        originalId: id,
        size: Number(infoColText.substring(0, infoColText.indexOf('張')).trim()) || null, // 总页数
        uploadTime: infoColText.substring(infoColText.indexOf('創建於') + 3).trim() || '', // 上传日期
        downSrc: '', // 下载地址
        href: 'https://www.wnacg.org/photos-index-aid-' + this.originalId + '.html', // 详情页链接
        author: title.substring(title.indexOf('[') + 1, title.indexOf(']')) || '', // 作者
        bookName: title.split('[').map(item => item.substring(item.indexOf(']') + 1)).filter(item => item).join('').trim() || '', // 书名
        isNotFix: title.includes('[無修正]') || false, // 是否无修正
        isCacheInfo: false, // 是否已缓存详情页
        isFavorites: false // 是否收藏
      })
    }
    for (let i = 0; i < list.length; i++) {
      const url = 'https://www.wnacg.org/download-index-aid-' + list[i].originalId + '.html'
      await chrome.get(url)
      html = await chrome.getPageSource()
      window = new jsDom(html).window
      $ = jquery(window)
      const downSrc = $('.download_btn .down_btn:nth-of-type(1)').attr('href')
      list[i].downSrc = 'https:' + downSrc.substring(0, downSrc.indexOf('?'))
    }
    return list.filter(item => Number(item.originalId) > 91678 && Number(item.originalId) < 101549)
  } catch (e) {
    console.log('异常')
    await chrome.quit()
  }
}

// 检查是否存在
const checkIsPresence = async (driver, element) => {
  try {
    await driver.findElement(By.css(element))
    return true
  } catch  {
    return false
  }
}

const test = async () => {
  for (let i = 661; i < 5000; i++) {
    console.log('i', i)
    const list = await get({ currentPage: (i + 1) })
    for (let j = 0; j < list.length; j++) {
      console.log('list[j]', list[j].originalId)
      console.log('uploadTime', list[j].downSrc)
      await Book.create(list[j], (err, res) => {
        if (err) return console.log(err)
        console.log('time', moment().format('YYYY-MM-DD HH:mm:ss'))
        console.log('ok', list[j].originalId)
      })
    }
    if (!list.length) {
      console.log('结束1')
      await chrome.quit()
    }
    // console.log('结束11')
    // await chrome.quit()
  }
  console.log('结束2')
  await chrome.quit()
}

test()

// get({},data => {
//   const list = data
//
//   let i = 0
//
//   const add = () => {
//     const book = list[i]
//     if (!book) return false
//     Book.create(book, (err, result) => {
//       if (err) return console.log(err)
//       console.log('ok', book.originalId)
//       i++
//       add()
//     })
//   }
//   console.log('data', data)
//   if (data.length) {
//     add()
//     console.log('ttt')
//   }
// })

