var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "专家详细信息",
    lastTitle:"专家列表",
    returnPage: "returnLastPage", /* 默认的方法名--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
    myFontIconList: [
      { "style": "icon-jf", "size": "font24", "color": "icon_color_huida", "title": "积分" },
      { "style": "icon-touxiang", "size": "font24", "color": "icon_color_ssbm", "title": "所属部门" },
      { "style": "icon-dianhua", "size": "font24", "color": "icon_color_dhhm", "title": "电话号码" },
      { "style": "icon-youxiang", "size": "font24", "color": "icon_color_yx", "title": "邮箱" },
      { "style": "icon-shouji", "size": "font26", "color": "icon_color_shouji", "title": "手机" },
      { "style": "icon-liebiao", "size": "font24", "color": "icon_color_zzfl", "title": "专家分类" },
      { "style": "icon-wend", "size": "font24", "color": "icon_color_youxiang", "title": "创建的文档" },
      { "style": "icon-jianjie", "size": "font24", "color": "icon_color_jj", "title": "简介" },
      { "style": "icon-gongcheng", "size": "font26", "color": "icon_color_gzjy", "title": "工程经验" },
      { "style": "icon-iconzhuixingping", "size": "font26", "color": "icon_color_xmjy", "title": "科研项目经验" },
      { "style": "icon-qikanlunwen-", "size": "font24", "color": "icon_color_lw", "title": "发表的论文论著" },
      { "style": "icon-zhishi", "size": "font26", "color": "icon_color_zscj", "title": "取得的知识产权" },
      { "style": "icon-sun-jiangbei", "size": "font24", "color": "icon_color_hjqk", "title": "获奖情况" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
      
    /* 发起接口请求--已办 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getExpertView&creator=&id=" + options.userId +"&key=myTask&model=pageinfo&pageSize=20&type=myTask",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.data.myFontIconList.push(res.data.searchBean);

        that.setData({
          myFontIconList: that.data.myFontIconList
        });
        console.log(that.data.myFontIconList);

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
  /* 返回上层 */
  returnLastPage:function(){
    wx.navigateBack({
      delta: 1
    });
  },
 /*  返回首层 */
  returnTopPage: function () {
    wx.navigateBack({
      delta: 10
    });
  },
  itemtap:function(e){

    console.log(e.currentTarget.dataset.zjid); 
    switch (e.currentTarget.dataset.itemid) {
      case 6:
        wx.navigateTo({
          url: "/pages/noTabBar/doc/doc?zjid=" + e.currentTarget.dataset.zjid+"&lastTitle=专家详细信息"
        });
        break;
      case 7:
        console.log("跳转到");
        break;
      case 8:
        console.log("跳转到");
        break;
      case 9:
        console.log("跳转到");
        break;
      case 10:
        console.log("跳转到");
        break;
      case 11:
        console.log("跳转到");
        break;
      case 12:
        console.log("跳转到");
        break;
      case 13:
        console.log("跳转到");
        break;
    }
  }
})