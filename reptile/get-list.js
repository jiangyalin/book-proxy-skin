const selenium = require('./selenium')
const config = require('./../config/default')
const tool = require('./../tool')
const Book = require('./../db/book')
const List = require('./../db/list')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')

const get = async ({ search = '', currentPage = 1 }, callback = () => {}) => {
  const chrome = selenium.create(true)

  await chrome.get(config.page.list + '/?ctl=albums&page=' + currentPage + '&sname=' + tool.utf8.encodeUtf8(search))
  // await chrome.get('http://www.baidu.com')

  const html = await chrome.getPageSource()

  const window = new jsDom(html).window
  const $ = jquery(window)

  await chrome.quit()

  const data = []
  const domBox = $('body ul.cc li.gallary_item')
  const book = new Book()
  const list = new List()
  book.initData()
  list.initData()
  for (let i = 0; i < domBox.length; i++) {
    const dom = domBox.eq(i)
    const infoColText = dom.find('.info_col').text()
    const title = dom.find('a').attr('title')
    const href = dom.find('a').attr('href')
    book.addBook({
      title,
      infoColText,
      href,
      cover: dom.find('img').attr('src')
    })
    list.addList({
      bookId: book.newBookData.id,
      uploadTime: book.newBookData.uploadTime
    })
  }
  callback(list.getAll())
}

// get(data => {
//   console.log('data', data)
// })

module.exports = get
