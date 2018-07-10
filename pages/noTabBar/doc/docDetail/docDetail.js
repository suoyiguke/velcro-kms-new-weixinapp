var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "文档详情",
    lastTitle: "文档",
    returnPage: "returnLastPage",
    /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
    replyList: [],
    urlPrefix: app.globalData.urlPrefix,
    docDetiel: {},
    flag: 0,
    textString:""


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
    });
    var that = this;
    console.log(options.docId);
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getRemarkList&currentPage=1&id=" + options.docId + "&model=ReamrkList&pageSize=20",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          replyList: res.data.pageBean.recordList
        });
      }
    });


    /*     http://119.29.176.106:8090/mobile/execute.do?action=getDocbase&id=2c923dae5e361670015e3bd994d0049c&model=docbase&pageSize=20&userid=402881e70be6d209010be75668750014 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getDocbase&id=" + options.docId + "&model=docbase&pageSize=20&userid=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          docDetiel: res.data
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /* 返回上层 */
  returnLastPage: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  changeColor1: function() {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function() {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function() {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function() {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function() {
    var that = this;
    that.setData({
      flag: 5
    });
  },
  bindTextAreaBlur: function(e) {
    var that = this;
    console.log(e.detail.value); //每次输入都会调用这个方法，打印文本值
    this.setData({
      textString: e.detail.value
    });
  },
  itemTap:function(e){
    var that = this;

    if (that.data.textString == "") {
      wx.showToast({
        title: "请输入评论内容！",
        icon: 'none',
        duration: 2000
      });
      return;
    }

    console.log(app.globalData.urlPrefix + "mobile/execute.do?action=setRemark");
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=setRemark",
      data: {
        action: "setRemark",
        id: e.currentTarget.dataset.id,
        model: "remark",
        objdesc: that.data.textString,
        score: that.data.flag,
        userId: app.globalData.userId
      },
      method:"POST",
      success: function (res) {
        console.log(res.data);
        that.onLoad(that.data.options);
      }
    });

  }, onPullDownRefresh: function () {
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  }
})