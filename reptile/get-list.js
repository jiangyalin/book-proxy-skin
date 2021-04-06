const selenium = require('./selenium')
const config = require('./../config/default')
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
  for (let i = 0; i < domBox.length; i++) {
    const dom = domBox.eq(i)
    const infoColText = dom.find('.info_col').text()
    const title = dom.find('a').attr('title')
    data.push({
      title,
      href: dom.find('a').attr('href'),
      cover: dom.find('img').attr('src'),
      page: Number(infoColText.substring(0, infoColText.indexOf('張')).trim()),
      createTime: infoColText.substring(infoColText.indexOf('創建於') + 3).trim(),
      author: title.substring(title.indexOf('[') + 1, title.indexOf(']')),
      bookName: title.split('[').map(item => item.substring(item.indexOf(']') + 1)).filter(item => item).join('').trim(),
      isNotFix: title.includes('[無修正]')
    })
  }
  // console.log('data', data)
  callback(data)
  // return data
}

module.exports = get
