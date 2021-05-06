/**
 * Created by jiangyalin on 2017/6/13.
 */

const down = function (url) {
  const elemIF = document.createElement('iframe')
  elemIF.src = url
  elemIF.style.display = 'none'
  document.body.appendChild(elemIF)
}

$('.j-list').on('click', '.j-down', function () {
  down($(this).attr('data-href'))
})

$('.j-list').on('click', '.j-favorites', function () {
  $.post('/api/favorites/' + $(this).attr('data-id'), res => {
    const text = $(this).text()
    if (text === '已收藏') {
      $(this).text('收藏')
    } else {
      $(this).text('已收藏')
    }
  })
})

$('.j-list').on('click', '.j-book', function () {
  // window.location.href = 'https://www.wnacg.org/photos-index-aid-' + $(this).attr('data-id') + '.html'
})

const getRequest = key => {
  const url = decodeURI(location.search)
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    const str = url.substring(url.indexOf('?') + 1, url.length)
    const str2 = str.split('&')
    for (let i = 0; i < str2.length; i++) {
      if (str2[i]) theRequest[str2[i].split('=')[0]] = unescape(str2[i].split('=')[1])
    }
    if (!key) {
      return theRequest
    } else {
      return theRequest[key]
    }
  }
}

const toPage = function (page) {
  $.get({
    url: '/api/book/list',
    data: {
      type: 'NOT_IMG',
      currentPage: page,
      search: getRequest('search')
    }
  }, res => {
    let listDom = ''
    res.data.rows.forEach(item => {
      let btnDom = ''
      if (item.isFavorites) btnDom = '<button class="u-btn j-favorites" data-id="' + item._id + '" type="button">已收藏</button>'
      if (!item.isFavorites) btnDom = '<button class="u-btn j-favorites" data-id="' + item._id + '" type="button">收藏</button>'
      const bookDom = '<li class="u-li">' +
        '<p>' + item.originalId + '</p>' +
        '<img class="u-cover j-book" src="' + item.cover + '" data-id="' + item.originalId + '">' +
        '<p class="u-p u-name">' + item.bookName + '</p>' +
        '<p class="u-p u-author">作者：' + item.author + '</p>' +
        '<p class="u-p u-time">' + item.createTime + '</p>' +
        '<div class="u-btn-gp">' +
        '<a class="u-btn j-down" type="button" data-href="' + item.downSrc + '?n=' + item.bookName + '" target="_blank">下载</a>' +
        btnDom +
        '</div>' +
        '</li>'
      listDom += bookDom
    })
    $('.j-list').html(listDom)
    $('.j-page').attr('data-current-page', res.data.currentPage)
    $('.j-page .j-tips').text('第' + res.data.currentPage + '页')
  })
}

toPage(1)
