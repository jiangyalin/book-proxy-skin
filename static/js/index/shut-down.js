const toPage = function (page) {
  $.get({
    url: '/api/shut-down/list',
    data: {
      type: 'NOT_IMG',
      currentPage: page
    }
  }, res => {
    let listDom = ''
    res.data.rows.forEach(item => {
      const bookDom = '' +
        '<li class="u-li j-li">' +
        '<p class="u-name j-name">' + item.name + '</p>' +
        '<span class="u-tips">' + item.remark + '</span>' +
        '<span class="u-rating">评级：' + item.rating + '星</span>' +
        '</li>'
      listDom += bookDom
    })
    $('.j-list').html(listDom)
  })
}

toPage(1)

$('.j-list').on('click', '.j-li', function () {
  window.location.href = '/list?type=NOT_IMG&currentPage=1&search=' + $(this).find('.j-name').text()
})
