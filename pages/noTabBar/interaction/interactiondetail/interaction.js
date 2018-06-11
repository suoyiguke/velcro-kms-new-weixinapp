var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "问答详情",
    questionList:{},
    answerList:[],
    urlPrefix: app.globalData.urlPrefix,
    lastTitle:"问答",
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id);
    var that = this;

    /* 发起接口请求--問題 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getFaqView&creator=&id=" + options.id+"&key=myTask&model=questioninfo&pageSize=20&type=myTask",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("问题=================》");

        console.log(res.data);
        that.setData({
          questionList: res.data
        });
      }
    });


    /* 发起接口请求--回答 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getReplyView&creator=&currentPage=1&key=&model=comments&pageSize=20&questionId=" + options.id+"&type=myTask&userId=8ae08bac4235c9cf01423696a91708c6",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          answerList: res.data
        });
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
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

/* 组件使用 */
  showDialog:function() {
    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent: function() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent: function() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },  /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  }



})