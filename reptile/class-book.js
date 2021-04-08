// 实体类
function book({ title, infoColText, href, cover }) {
  this.title = title || '' // 原文标题
  this.cover = 'https:' + cover || '' // 封面
  this.info = infoColText || '' // 原文辅助信息
  this.id = Number(href.substring(href.indexOf('aid-') + 4, href.indexOf('.'))) || ''
  this.size = Number(infoColText.substring(0, infoColText.indexOf('張')).trim()) || null // 总页数
  this.uploadTime = infoColText.substring(infoColText.indexOf('創建於') + 3).trim() || '' // 上传日期
  this.createTime = moment().format('YYYY-MM-DD HH:mm:ss') // 创建时间
  this.downSrc = '' // 下载地址
  this.href = 'https://www.wnacg.org/photos-index-aid-' + this.id + '.html' // 详情页链接
  this.author = title.substring(title.indexOf('[') + 1, title.indexOf(']')) || '' // 作者
  this.bookName = title.split('[').map(item => item.substring(item.indexOf(']') + 1)).filter(item => item).join('').trim() || '' // 书名
  this.isNotFix = title.includes('[無修正]') || false // 是否无修正
  this.isCacheInfo = false // 是否已缓存详情页
  this.isFavorites = false // 是否收藏
}

module.exports = book
