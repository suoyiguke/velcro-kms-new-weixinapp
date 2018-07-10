var app = getApp(); // 取得全局App

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"团队详情",
    lastTitle:"虚拟团队",
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
    optionTitle: ["团队成员", "团队文章"],
    option1: true,
    option2: false,
    teamDetail:{},
    teamPersonList:[],
    teamDocList:[],
    urlPrefix:app.globalData.urlPrefix,
    fontSizeCss:"teamdetail-item-info-lb"
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    });
    var that = this;
    /* 发起接口请求--团队详情数据 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getTeamView&id=" + options.id +"&model=teamView&pageSize=20",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.searchBean);
        if (res.data.searchBean.summary.length>20){
          
          that.setData({
            teamDetail: res.data.searchBean,
            fontSizeCss: "teamdetail-item-info-lb-minfont"
          });
          return;
        }
        that.setData({
          teamDetail: res.data.searchBean
        });
      }
    });

    /* http://119.29.176.106:8090/mobile/execute.do?action=getTeamMember&currentPage=1&model=teammember&pageSize=20&teamid=2c923dae62be3e590162ca5c95220a51&type=myTask */
    /* 发起接口请求--团队详情数据 */
    wx.request({
      url: app.globalData.urlPrefix + "/mobile/execute.do?action=getTeamMember&currentPage=1&model=teammember&pageSize=20&teamid=" + options.id +"&type=myTask",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("数据获得！================");

        console.log(res.data.pageBean.recordList);
        that.setData({
          teamPersonList: res.data.pageBean.recordList
        });
      }
    });

    /* http://119.29.176.106:8090/mobile/execute.do?action=getTeamDoc&currentPage=1&model=teamDoc&pageSize=20&teamid=2c923dae628987e701628a3952a81532&type=myTask */
    /* 发起接口请求--团队文章 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getTeamDoc&currentPage=1&model=teamDoc&pageSize=20&teamid=" + options.id +"&type=myTask",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("数据获得！================");

        console.log(res.data.pageBean.recordList);
         that.setData({
           teamDocList: res.data.pageBean.recordList
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
  selectOption1: function (e) {
    this.setData({
      option1: true,
      option2: false

    })
  },
  selectOption2: function (e) {
    this.setData({
      option1: false,
      option2: true
    })
  },
  itemTap:function(e){
    console.log(e.currentTarget.dataset.userid);
    console.log("查看团队的纤详细信息！===========由于标准版功能也不完整，这里暂时写到这！");
    wx.navigateTo({
      url: "/pages/noTabBar/team/teamdetail/zj/zj?userid=" + e.currentTarget.dataset.userid
    });



    /* 发起接口请求--已办 */
   /*  wx.request({
      url: "http://119.23.255.13:8098/mobile/execute.do?action=getDocbaseList&creator=" + app.globalData.userId+"&currentPage=1&id=" + id + "&model=DocbaseList&pageSize=20",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {

        console.log(res.data);
      }
    }); */
  },
  /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  itemDacTap:function(e){
    console.log(e.currentTarget.dataset.docid);
    console.log("查看團隊文檔！===========");

    wx.navigateTo({
      url: "/pages/noTabBar/team/teamdetail/teamdoc/teamdoc?docId=" + e.currentTarget.dataset.docid
    });
  },onPullDownRefresh: function () {
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  }
})