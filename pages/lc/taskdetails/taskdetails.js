

var app = getApp();     // 取得全局App


Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastTitle: "流程", /* 上一个页面标题 */
    title: "任务详情",
    hide: "",
    updatecolor:"",
    hideNum:0,
    /* 底部弹窗相关属性 */
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: "查看流转意见" },
      { bindtap: 'Menu2', txt: "退出" },
      { bindtap: 'Menu3', txt: '查看流程图' }
    ],
    background: [],
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
  /* 返回上一页 */
  returnLastPage: function(){
    wx.navigateBack(1);
  },
  showAndHide: function(){

    
    if (this.data.hideNum%2 === 0){
      this.setData({
        hide: "hideTextArea",
        updatecolor:"updatecolor"

      });
    }else{
      this.setData({
        hide: "",
        updatecolor: ""

      });
    }
    //叠加
    this.setData({
      hideNum: this.data.hideNum+1

    });
  },

  /* 底部弹窗相关事件 */
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    console.log("打开了弹窗~~~~~~~~~");
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    console.log("关闭了弹窗！！");
  },

  bindMenu1: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
    
    wx.navigateTo({
      url: "/pages/lc/taskdetails/opinion/opinion"
    });
    
  },
  bindMenu2: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  bindMenu3: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },/* 触摸变色 */
  itemTouchStart: function (e) {
    
    console.log("触摸开始=============");
    var array = app.globalData.array;

    if (e.target.id == 0){//第一个
      array[0] = "bc-select";
      this.setData({
        background: array
      });
    } else if (e.target.id == 1){
   
      array[1] = "bc-select";
      this.setData({
        background: array
      });
    } else if (e.target.id == 2) {
      array[2] = "bc-select";
      this.setData({
        background: array
      });
    } else if (e.target.id == 3) {
      array[3] = "bc-select";
      this.setData({
        background: array
      });
    }

    app.globalData.array = array;



  }
  ,/* 触摸变色 */
  itemTouchEnd: function (e) {
    console.log("触摸结束=============");

    var array = app.globalData.array;
    if (e.target.id == 0) {//第一个
      array[0] = "";
      this.setData({
        background: array
      });
    } else if (e.target.id == 1) {
      array[1] = "";
      this.setData({
        background: array
      });
    } else if (e.target.id == 2) {
      array[2] = "";
      this.setData({
        background: array
      });
    } else if (e.target.id == 3) {
      array[3] = "";
      this.setData({
        background: array
      });
    }
  },  /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  }

})