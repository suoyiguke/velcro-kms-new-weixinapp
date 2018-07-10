var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:"问卷详情",
   lastTitle:"问卷调查",
   headRight:"交卷",
   returnPage: "returnLastPage",
   singleItems: [],
   multiItems:[],
   sid:"" /* 问卷id */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      options: options,
      sid: options.id
    });

    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getSurveyView&model=SurveyView&pageSize=20&sid=" + options.id +"&swfId=2c923dae5d3fdce1015d4e68bab50a42&type=0&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          singleItems: res.data.singleItems,
          multiItems: res.data.multiItems
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
  headRight:function(e){
   var that = this;


   wx.request({
     url: app.globalData.urlPrefix + "mobile/execute.do?action=savePaperAnswer&paperId=" + this.data.sid+"&userId=" + app.globalData.userId,
     data: {
       arr: {
           id:'',
           type:0,
           userAnswer:''

       }
       
     },
     header: {
       'content-type': 'application/json;utf-8' // 默认值
     },
     success: function (res) {
       console.log(res.data);
     }
   });

  }, /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})