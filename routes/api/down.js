const express = require('express')
const router = express.Router()
const Book = new require('./../../models/book')

// 下载（根据id）
router.post('/:id', async (req, res) => {
  // 查询数据
  const book = await Book.findOne({ _id: req.params.id }, { isFavorites: 1 }, {})

  console.log('aa', book)

  // const update = { $set: { isFavorites: !book._doc.isFavorites } } // 修改项
  // // 更新数据
  // const upBook = await Book.update({ _id: req.params.id }, update, {})
  res.jsonp({
    code: 200,
    data: book
  })
})

module.exports = router



// axios({
//   method: 'get',
//   url: 'http://124.70.153.221:9998/ftppic/2021/20210426143358793.zip',
//   responseType: 'blob',
//   // headers: { Authorization: token },
//   onDownloadProgress: (evt) => {
//     console.log('evt', parseInt((evt.loaded / evt.total) * 100))
//     // console.log("progressEvent===",evt )
//     // 对原生进度事件的处理
//     // this.setState({ progress: parseInt((evt.loaded / evt.total) * 100) });
//   }
// }).then(res => {
//   // let type = res.headers['content-type'] // 请求头中文件类型
//   console.log('res', res)
//
//   const name = 'zz.zip' // 请求头中文件名
//
//
//   const blob = new Blob([res.data])
//
//   const elink = document.createElement('a')
//
//   elink.download = name
//
//   elink.style.display = 'none'
//
//   elink.href = URL.createObjectURL(blob)
//
//   document.body.appendChild(elink)
//
//   elink.click()
//
//   URL.revokeObjectURL(elink.href) // 释放URL 对象
//
//   document.body.removeChild(elink)
// })
