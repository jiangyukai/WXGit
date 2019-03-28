Page({

  data: {
    loading: false,
    loadtxt: '正在加载',
    currentId: '1001',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    tradeList: [
      { name :'111',price:'222'},{name:'333',price:'444'},
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      ],
    newList: [],
    section: [
      { name: '时政', id: '1001' }, { name: '解读', id: '1032' },
      { name: '视点', id: '1003' }, { name: '交易', id: '1004' },
      { name: '质价标准', id: '1005' }, { name: '质价标准', id: '1006' },
      { name: '质价标准', id: '1007' }, { name: '质价标准', id: '1008' }
    ]
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '测试分享',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  },
  onLoad: function () {

    this.getData();
  },
  getData: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/testControl/test1',//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET', 
      success: function (res) {
        console.log(res.data);
        that.setData({
          headLineList: res.data.newsData
        });
        
      },
      fail: function (err) {
        console.log("失败"+err.errMsg);

      }
    })
  },

  handleTap: function (e) {
    console.log(e);
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }

  },
  //新闻详情
  jumpDetails: function (e) {
    console.log("-----"+e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../index/news/news?newsId=' + e.currentTarget.dataset.id,
      success: function (res) {
        // success
        console.log("接口调用成功的回调函数");
      },
      fail: function () {
        // fail
        console.log("接口调用失败的回调函数");
      },
      complete: function () {
        // complete
        console.log("调用接口完成");
      }
    })
  }


    
})