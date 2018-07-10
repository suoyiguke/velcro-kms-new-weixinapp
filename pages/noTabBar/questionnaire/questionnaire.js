var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionTitle: ["待参与", '已参与'],
    option1: true,
    option2: false,
    title: '问卷调查',
    lastTitle: "返回",
  returnPage: "returnLastPage",
  /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
  questList2:[],
  questList1: []

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getSurveyList&currentPage=1&model=surveyList&pageSize=20&type=1&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          questList2: res.data.pageBean.recordList
        });
      }
    });

    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getSurveyList&model=surveyList&pageSize=20&type=0&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          questList1: res.data.pageBean.recordList
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
  /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  itemTap:function(e){
    wx.navigateTo({
      url: "/pages/noTabBar/questionnaire/quesdetail/quesdetail?id=" + e.currentTarget.dataset.id
    });
  }
})