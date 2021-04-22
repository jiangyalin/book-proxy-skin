const tool = require('./tool')
const selenium = require('./reptile/selenium')
//
// const get = async (callback = () => {}) => {
//   const chrome = selenium.create(false)
//
//   await chrome.get('http://www.baidu.com')
//
// }
//
// get(data => {
//   console.log('data', data)
// })

// console.log('unicode', tool.unicode.encodeUnicode('测试'))
// console.log('a', tool.unicode.decodeUnicode('%E5%A6%82%E6%9C%88%E7%BE%A4%E7%9C%9F'))
// console.log('d', tool.utf8.encodeUtf8('测试'))
// console.log('t', tool.utf8.decodeUtf8('%E5%A6%82%E6%9C%88%E7%BE%A4%E7%9C%9F'))

// module.exports = get

const test = async () => {
  const chrome = await selenium.create(false)
  console.log('chrome1', chrome)
  await chrome.sleep(5000)
  await chrome.quit()
  console.log('chrome2', chrome)
}

test()
