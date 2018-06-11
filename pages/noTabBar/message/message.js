var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "流程",
    option1: true,
    option2: false,
    optionTitle: ["未读", "已读"],
    background: "bc-unchecked", /* 列表默认样式 */
    wdMessageList: [],
    ydMessageList: []

  },
  selectOption1: function (e) {
    this.setData({
      option1: true,
      option2: false

    })
  },
  selectOption2: function (e) {
    this.setData({
      option1: false,
      option2: true
    })
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*  发起接口请求--未读消息 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getUnreadMsg&currentPage=1&model=noticeList&pageSize=20&type=UnreadMsg&userId=8ae08bac4235c9cf01423696a91708c6",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          wdMessageList: res.data.pageBean.recordList
        });
  }
    });


    /*  发起接口请求--已读消息 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getReadMsg&currentPage=1&model=readmsg&pageSize=20&type=readmsgs&userId=8ae08bac4235c9cf01423696a91708c6",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          ydMessageList: res.data.pageBean.recordList
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  itemTap: function(e){
    console.log("消息id============>" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/noTabBar/message/messagedetail/messagedetail?id=" + e.currentTarget.dataset.id
    });
  }
})