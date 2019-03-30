function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getNews: getNews
}

/*加载新闻列表*/ 
function getNews(pageindex, callbackcount, callback) {
  wx.request({
    url: 'http://localhost:8080/testControl/test1',
    data: {
      count: callbackcount,  //返回数据的个数
      p: pageindex,//第几次加载
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      callback(res.data);
    }
  })
}

// module.exports = {
//   getSearchMusic: getSearchMusic
// }
