var util = require("messagedetail-utils.js");
var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title: "内容",
     lastTitle:"消息会话",
     messDetailList:{} /* 单个json对象 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    console.log("消息id============="+id);

    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getNotice&id="+id+"&model=Docbase&pageSize=20&userid="+app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        if (res.data == void(0)){//获得数据为空！
          //res.data.messagecontent = "数据为空！";
          return;
        }
        that.setData({
          messDetailList: res.data
        });
/*         console.log(res.data.messagecontent);
        var num = util.nthIndexOf(res.data.messagecontent, "，", 1);
        res.data.messagecontent = res.data.messagecontent.replace(res.data.messagecontent.slice(num + 1), '');
        console.log(res.data.messagecontent);

        that.setData({
          messDetailList: res.data
        }); */
       
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
  tapitem:function(e){
    
    wx.navigateTo({
      url: "/pages/noTabBar/message/messagedetail/vecle/vecle?workflowid=" + e.currentTarget.dataset.workflowid
    });
  }
})