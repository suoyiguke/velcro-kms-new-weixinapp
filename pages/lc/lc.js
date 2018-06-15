var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "流程",
    option1: true,
    option2: false,
    option3: false,
    optionTitle: ["待办", "已办", "知会"],
    headAdd: true /* 是否有加号？ */,
    recordListDb:[],
    recordListYb:[],
    recordListZh:[]
  },
  selectOption1: function (e) {
    this.setData({
      option1: true,
      option2: false,
      option3: false

    })
  },
  selectOption2: function (e) {
    this.setData({
      option1: false,
      option2: true,
      option3: false
    })
  },
  selectOption3: function (e) {
    this.setData({
      option1: false,
      option2: false,
      option3: true
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   /*  发起接口请求--已办 */
    wx.request({
      url: app.globalData.urlPrefix +"mobile/execute.do?action=getWorkflowList&creator=&currentPage=1&key=myTask&model=workflow&objname=&pageSize=20&type=myTask&userId=8ae08bac4235c9cf01423696a91708c6", 
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListDb: res.data.pageBean.recordList
        });

        if (that.data.recordListDb === undefined || that.data.recordListDb.length == 0) {
          console.log("===============数组1为空");
        }

      }
    });

    /*  发起接口请求 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getWorkflowList&creator=&currentPage=1&key=myRelative&model=workflow&objname=&pageSize=20&type=myRelative&userId=8ae08bac4235c9cf01423696a91708c6",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListYb: res.data.pageBean.recordList
        });
        if (that.data.recordListYb === undefined || that.data.recordListYb.length == 0) {
          console.log("===============数组2为空");
        }
      }
    });

    /*  发起接口请求 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getWorkflowList&creator=&currentPage=1&key=myNotice&model=workflow&objname=&pageSize=20&type=myNotice&userId=8ae08bac4235c9cf01423696a91708c6",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListZh: res.data.pageBean.recordList
        });
        if (that.data.recordListZh === undefined || that.data.recordListZh.length == 0) {
          console.log("===============数组3为空");
        }

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
  itemTap: function(e) {
   
    console.log("item被点击=============");
    var urlx = "/pages/lc/taskdetails/taskdetails?title=" + this.data.title;
    wx.navigateTo({
      url: urlx
    });
  },
  /* 跳转到添加页面 */
  addItem:function(){
    wx.navigateTo({
      url: "/pages/lc/addflow/addflow?title=" + this.data.title
    });
  }
})