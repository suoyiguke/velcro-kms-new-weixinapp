var app = getApp(); // 取得全局App

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "流转意见",
    close: true,
    recordList1: [],
    recordList2: [],
    isOk: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.type == 1) {

      console.log(options.id);
      wx.request({
        url: app.globalData.urlPrefix + "mobile/execute.do?action=getworkflowlog&currentPage=1&id=" + options.id + "&model=workflowlog&pageSize=20",
        header: {
          'content-type': 'application/json;utf-8' // 默认值
        },
        success: function(res) {
          console.log(res.data.pageBean.recordList);
          that.setData({
            recordList1: res.data.pageBean.recordList
          });
        }
      });
    } else if (options.type == 2) {
      wx.request({
        url: app.globalData.urlPrefix + "mobile/execute.do?action=getRejectNodeList&model=rejectNodeList&pageSize=20&workflowId=" + options.id,
        header: {
          'content-type': 'application/json;utf-8' // 默认值
        },
        success: function(res) {
          if (res.data.pageBean == void(0)){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            });
          }
         
          console.log(res.data.pageBean.recordList);
          that.setData({
            recordList2: res.data.pageBean.recordList,
            headOk: true
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

  },
  closePage: function() {
    wx.navigateBack(1);
  },
  itemTap: function(e) {
    this.setData({
      isOk: true
    });
  },
  okItem: function(e) {
    console.log("点击类确定");
    /*     http://119.29.176.106:8090/mobile/execute.do?action=rejectWorkflow
     */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=rejectWorkflow",
      data: {
        action: "rejectWorkflow",
        model: "rejectWorkflow",
        nodeId: "402881b55bf50f7e015bf5c25f6d0022",
        remark: "",
        userId: app.globalData.userId,
        workflowId: "40288182630a36a101630a3b786a001f"
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      method:"POST",
      success: function(res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordList2: res.data.pageBean.recordList,
          headOk: true
        });
      }
    });
  }
})