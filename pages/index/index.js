var indexUtils = require("index-utils.js");
var app = getApp(); // 取得全局App
// pages/lc/lc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    title:"KMS知识管理系统",
    background: ['/static/img/csc_1.png', '/static/img/csc_2.png', '/static/img/csc_3.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 4000,//滑块自动切换时间
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    iconfont_yangshi: [
      { id: 1,"style": "iconfont_agency", "color":"icon_angency_color",title:"代办已办"},
      { id: 2,"style": "iconfont_mail_list", "color": "icon-customer_color", title: "通讯录"},
      { id: 3, "style": "iconfont_knowledge_one", "color": "icon_knowledge_color", title: "知识文档"},
      { id: 4, "style": "iconfont_msg", "color": "icon_msg_color", title: "消息会话"},
      { id: 5, "style": "iconfont_notice", "color": "icon_notice_color", title: "通知公告"},
      { id: 6,"style": "iconfont_project_management", "color": "icon_management_color", title: "项目管理"},
      { id: 7, "style": "iconfont_contract", "color": "icon_contract_color", title: "合同管理"},
      { id: 8,"style": "iconfont_customer_management", "color": "icon_customer_color", title: "客户管理"},
      { id: 9,"style": "iconfont_y_page_two", "color": "icon_page_color", title: "专家黄页"},
      { id: 10, "style": "iconfont_q_a_d", "color": "icon_q_a_d_color", title: "互动回答"},
      { id: 11,"style": "iconfont_team", "color": "icon_team_color", title: "虚拟团队"},
      { id: 12,"style": "iconfont_encyclopedias", "color": "icon_encyclopedias_color", title: "知识百科"},
      { id: 13, "style": "iconfont_encyclopedias", "color": "icon_encyclopedias_color", title: "在线投票"},
      { id: 14,"style": "iconfont_encyclopedias", "color": "icon_encyclopedias_color", title: "在线考试"},
      { id: 15,"style": "iconfont_encyclopedias", "color": "icon_encyclopedias_color", title: "问卷调查"},
      { id: 16,"style": "iconfont_encyclopedias", "color": "icon_encyclopedias_color", title: "百度地图"},
      ],
    workflownum: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index.js 的onLoad方法');
    console.log(wx.getStorageSync("workflownum"));
    this.setData({
      workflownum: wx.getStorageSync("workflownum")
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
  /* 页面导航 */
  inedxRedirectAction:function(e){
    console.log(e.target.id);
    indexUtils.pageJump(e.target.id);

  },/* 触摸变色 */
  indexItemTouchstart: function (e) {
    console.log("触摸开始=============");

    console.log(e.target.id);
    
  }
  ,/* 触摸变色 */
  indexItemTouchend: function (e) {
  
    console.log(e.target.id);

    console.log("触摸结束=============");
  }

})