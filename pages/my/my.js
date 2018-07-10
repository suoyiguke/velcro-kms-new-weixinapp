var app = getApp(); // 取得全局App
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "个人信息",
    myFontIconList: [
      { "style": "icon-huida", "size": "font24", "color": "icon_color_huida", "title": "我的待答" },
      { "style": "icon-zhishi", "size": "font24", "color": "icon_color_zhishi", "title": "我的知识" },
      { "style": "icon-guanzhu", "size": "font24", "color": "icon_color_guanzhu", "title": "我的关注" },
      { "style": "icon-bumen", "size": "font21 wuzi", "color": "icon_color_bumen", "title": "部门" },
      { "style": "icon-shouji", "size": "font24", "color": "icon_color_shouji", "title": "手机" },
      { "style": "icon-dianhua", "size": "font24", "color": "icon_color_dianhua", "title": "电话" },
      { "style": "icon-youxiang", "size": "font24", "color": "icon_color_youxiang", "title": "邮箱" },
      { "style": "icon-dizhi", "size": "font24", "color": "icon_color_dizhi", "title": "办公地址" },
      { "style": "icon-mima", "size": "font24", "color": "icon_color_mima", "title": "修改密码" }
    ],
    userInfo:[],
    urlPrefix: app.globalData.urlPrefix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   var that = this;
    /* http://119.29.176.106:8090/mobile/execute.do?action=getHumres&id="+app.globalData.userId+"&model=humres&pageSize=20 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getHumres&id="+app.globalData.userId+"&model=humres&pageSize=20",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.user);
        //迭代
        that.data.myFontIconList.forEach((item,index) => {
          switch (index) {
            case 0:
              item.text = res.data.replyNum;
              break;
            case 3:
              item.text = res.data.user.orgName;
              break;
            case 4:
              item.text = res.data.user.tel2;
              break;
            case 5:
              item.text = res.data.user.tel1;
              break;
            case 6:
              item.text = res.data.user.email;
              break;
          };
        
        });

        that.setData({
          myFontIconList: that.data.myFontIconList,
          userInfo: res.data.user
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
  itemTap: function(e){
  
    switch (e.currentTarget.dataset.index) {
      case 0: /* 待答 */
        wx.navigateTo({
          url: "/pages/noTabBar/interaction/interaction?param=option3"
        });
        break;
      case 1:
        wx.navigateTo({
          url: "/pages/noTabBar/doc/doc?param=mydoc"
        });
        break;
      case 2:
        wx.navigateTo({
          url: "/pages/my/follow/follow"
        });
        break;
      case 8: /* 修改密码 */
        wx.navigateTo({
          url: "/pages/my/follow/follow"
        });
        break;
    };
  }
})