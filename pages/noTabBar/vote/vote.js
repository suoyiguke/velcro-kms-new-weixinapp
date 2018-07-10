var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionTitle: ["待参与", '已参与'],
    option1: true,
    option2: false,
    recordList2:[],
    recordList1: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      options: options
    });
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=joinVoteList&currentPage=1&model=vote&pageSize=20&userId="+app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordList2: res.data.pageBean.recordList
        });
      }
    });



    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=waitVoteList&model=vote&pageSize=20&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordList1: res.data.pageBean.recordList
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
  itemTap:function(e){

    wx.navigateTo({
      url: "/pages/noTabBar/vote/voteDetail/voteDetail?id=" + e.currentTarget.dataset.id
    });
  }
})