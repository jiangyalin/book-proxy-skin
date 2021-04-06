const selenium = require('./selenium')
const config = require('./../config/default')

const get = async () => {
  const chrome = selenium.create(true)

  await chrome.get(config.page.list)
  // await chrome.get('http://www.baidu.com')

  const html = await chrome.getPageSource()

  await chrome.quit()

  console.log('html', html)
}

get()

// module.exports = ''
