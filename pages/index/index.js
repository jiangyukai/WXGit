Page({

  data: {
    height: '',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    tradeList: [
      { name :'111',price:'222'},{name:'333',price:'444'},
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      ],
    newsList:[],
    resArr : [],
    headLineList: [],
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },
  getData: function () {
    var that = this;
    var golbNewsId = this.data.background;
    console.log(golbNewsId+"*********************");
    wx.request({
      url: 'http://localhost:8080/testControl/test1',//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      data: { id: golbNewsId },
      method: 'GET', 
      success: function (res) {
        that.setData({
          newsList: res.data.newsData
        }); 
      },
      fail: function (err) {
        console.log("失败"+err.errMsg);
      }
    })
  },

  handleTap: function (e) {
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
  },
  lower() {
    var result = this.data.newsList;
    var lowerThis = this;
    this.getData();
    // wx.request({
    //   url: 'http://localhost:8080/testControl/test1?id=golbNewsId',//请求地址
    //   header: {
    //     "Content-Type": "applciation/json"
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     lowerThis.setData({
    //       resArr: res.data.newsData
    //     });
    //   },
    //   fail: function (err) {
    //     console.log("失败" + err.errMsg);
    //   }
    // })
    console.log(resArr.length + "***************************************");
    var cont = result.concat(resArr);
    console.log(cont.length + "-////////////////////////////////////////////");
    console.log(resArr.length + "***************************************");
    console.log(cont.length);
    if (cont.length >= 100) {
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: 'success',
        duration: 300
      });
      return false;
    } else {
      wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
      });
      setTimeout(() => {
        this.setData({
          newsList: cont
        });
        wx.hideLoading();
      }, 1500)
    }
  }


    
})