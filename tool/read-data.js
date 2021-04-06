const fs = require('fs')
const createFolder = require('./create-folder')

// 读取数据
module.exports = name => {
  createFolder('./data')
  const path = './data/' + name + '.json'
  if (!fs.existsSync(path)) return false
  const updatedList = fs.readFileSync(path, 'utf8')
  return JSON.parse(updatedList)
}
