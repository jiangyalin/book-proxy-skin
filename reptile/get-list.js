const selenium = require('./selenium')
const config = require('./../config/default')
const Book = require('./../db/book')
const List = require('./../db/list')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')

const get = async (callback = () => {}) => {
  const chrome = selenium.create(true)

  await chrome.get(config.page.list)
  // await chrome.get('http://www.baidu.com')

  const html = await chrome.getPageSource()

  const window = new jsDom(html).window
  const $ = jquery(window)

  await chrome.quit()

  // console.log('html', html)
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
  // console.log('data', data)
  callback(list.getAll())
  // return data
}

// get(data => {
//   console.log('data', data)
// })

module.exports = get
