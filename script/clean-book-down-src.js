// 清洗下载链接
const { By } = require('selenium-webdriver')
const selenium = require('./../reptile/selenium')
const config = require('./../config/default')
const tool = require('./../tool')
const jsDom = require('jsdom').JSDOM
const jquery = require('jquery')
const moment = require('moment')
const Book = new require('./../models/book')
const pageList = require('./../models/page-list')
const chrome = selenium.create(true)

const getList = async page => {
  // 查询数据
  // const page = Number(0) + 1 // 当前页码
  const pageSize = Number(1) // 每页条数
  const qs = new RegExp('') // 标题正则参数
  const Model = Book // 模板
  const populate = ''
  const criteria = { isCacheInfo: false, $or: [{ title: qs }, { name: qs }] } // 查询条件
  let fields = { description: 1, date: -1, originalId: 1, downSrc: 1 } // 待返回的字段
  const options = { sort: [{ date: -1 }] } // 排序
  return pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options)
}

const edit = async (id, originalId, downSrc) => {
  let conditions = { _id: id } // 修改对象条件
  let update = { $set: { downSrc: downSrc } }//修改项
  let options = {}
  // 更新数据
  await Book.update(conditions, update, options, (err, result) => {
    if (err) return console.log(err)
    console.log('update ok', originalId)
  })
}

const get = async () => {
  let html = ''
  let window = ''
  let $ = ''
  for (let i = 9000; i < 22000; i++) {
    const $page = await getList(i)
    const data = {
      total: $page.count,
      rows: $page.results
    }

    if (!data.rows[0].downSrc.includes(':')) {
      const id = data.rows[0]._id
      const originalId = data.rows[0].originalId
      // const downSrc = data.rows[0].downSrc
      console.log('需originalId', data.rows[0].originalId)

      const url = 'https://www.wnacg.org/download-index-aid-' + originalId + '.html'
      await chrome.get(url)
      html = await chrome.getPageSource()
      window = new jsDom(html).window
      $ = jquery(window)
      const _downSrc = $('.download_btn .down_btn:nth-of-type(1)').attr('href')
      const downSrc = 'https:' + _downSrc.substring(0, _downSrc.indexOf('?'))
      console.log('downSrc', downSrc)

      await edit(id, originalId, downSrc)
      // await Book.create(data.rows[0], (err, res) => {
      //   if (err) return console.log(err)
      //   console.log('ok', data.rows[0].originalId)
      // })
      // console.log('data', data)
    } else {
      console.log('无需originalId', data.rows[0].originalId)
    }
  }
  console.log('结束1')
  await chrome.quit()
}

get()
