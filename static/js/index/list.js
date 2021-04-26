/**
 * Created by jiangyalin on 2017/6/13.
 */

const down = function (url) {
  const elemIF = document.createElement('iframe')
  elemIF.src = url
  elemIF.style.display = 'none'
  document.body.appendChild(elemIF)
}

$('.j-down').click(function () {
  down($(this).attr('data-href'))
})

$('.j-favorites').click(function () {
  $.post('/api/favorites/' + $(this).attr('data-id'), res => {
    const text = $(this).text()
    if (text === '已收藏') {
      $(this).text('收藏')
    } else {
      $(this).text('已收藏')
    }
  })
})

$('.j-book').click(function () {
  // window.location.href = 'https://www.wnacg.org/photos-index-aid-' + $(this).attr('data-id') + '.html'
})
