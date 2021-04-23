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
