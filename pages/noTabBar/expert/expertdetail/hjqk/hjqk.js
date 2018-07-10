var app = getApp(); // 取得全局App

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "",
    title:"",
    lastTitle: "专家详情页", /* 是否为简单版块？默认是 */
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      var that = this;

    if (options.type == 7) {
      /* 专家简介 */

      wx.request({
        url: app.globalData.urlPrefix + "mobile/execute.do?action=expertDesc&model=expert&pageSize=20&userId=" + options.zjid,
        header: {
          'content-type': 'application/json;utf-8' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          that.setData({
            text: res.data.objdesc,
            title: options.lastTitle
          });
        }
      });
    } else if (options.type == 8){


      wx.request({
        url: app.globalData.urlPrefix + "mobile/execute.do?action=expertExp&model=expert&pageSize=20&userId=" + options.zjid,
        header: {
          'content-type': 'application/json;utf-8' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            text: res.data.objdesc,
            title: options.lastTitle
          });
        }
      });
      } else if (options.type == 9) {

        wx.request({
          url: app.globalData.urlPrefix + "mobile/execute.do?action=expertProExp&model=expert&pageSize=20&userId=" + options.zjid,
          header: {
            'content-type': 'application/json;utf-8' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              text: res.data.objdesc,
              title: options.lastTitle
            });
          }
        });
      } else if (options.type == 10) {


        wx.request({
          url: app.globalData.urlPrefix + "mobile/execute.do?action=expertThesis&model=expert&pageSize=20&userId=" + options.zjid,
          header: {
            'content-type': 'application/json;utf-8' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              text: res.data.objdesc,
              title: options.lastTitle
            });
          }
        });
      } else if (options.type == 11) {

        wx.request({
          url: app.globalData.urlPrefix + "mobile/execute.do?action=expertDocRight&model=expert&pageSize=20&userId=" + options.zjid,
          header: {
            'content-type': 'application/json;utf-8' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              text: res.data.objdesc,
              title: options.lastTitle
            });
          }
        });
      } else if (options.type == 12) {


        wx.request({
          url: app.globalData.urlPrefix + "mobile/execute.do?action=expertDocRight&model=expert&pageSize=20&userId=" + options.zjid,
          header: {
            'content-type': 'application/json;utf-8' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              text: res.data.objdesc,
              title: options.lastTitle
            });
          }
        });
      } 
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

  }, /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
})