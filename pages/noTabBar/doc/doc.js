// pages/noTabBar/doc/doc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "文档",
    lastTitle: "返回",
    dac1List:[],
    isSimple: true, /* 是否为简单版块？默认是 */
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (options.lastTitle != void (0) || options.lastTitle != ""){
      that.setData({
        lastTitle: options.lastTitle
      });

    }


    var urlx = "";
    //判断是不是专家详细页面过来查看该专家的所有文档的
    if (options.zjid != void (0)) {
      urlx = "http://119.23.255.13:8098/mobile/execute.do?action=searchDocbase&currentPage=1&flag=1&model=DocbaseList&name=&pageSize=20&userId=" + options.zjid;
      
    }else{
      //如果不是专家那来的，肯定是手动点击查看文档。这里需要返回首层！
      that.setData({
        returnPage: "returnTopPage" /* 设为首层 */
      });

      var id = options.id;
      console.log("=================id==========" + id);
      if (id == void (0)) {
        id = "";
      }
      urlx = "http://119.23.255.13:8098/mobile/execute.do?action=getDocbaseList&creator=8ae08bac4235c9cf01423696a91708c6&currentPage=1&id=" + id + "&model=DocbaseList&pageSize=20";
    }

    
    /*  发起接口请求--已办 */
    wx.request({
      url: urlx,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);

        //截取字符串
        res.data.pageBean.recordList.forEach((item) => {
          if (item.name == void (0) || (item.name == '')) {
            return true;/* 跳过此次循环 */
          }
          if (item.name.length>15){
            item.name = item.name.substring(0, 15) + "...";
          }
        });


        that.setData({
        
          dac1List: res.data.pageBean.recordList
        });

        if (that.data.dac1List === undefined || that.data.dac1List.length == 0) {
           console.log("===============数组1为空");
        } 
        
        if (that.data.dac1List[0].creator == void(0)){
          console.log("=========没有作者，属于简单版块============");
          that.setData({

            isSimple: true /* 设为简单版块 */
          });

        }else{
          console.log("==>有作者，非简单版块============" + that.data.dac1List.creator);
          that.setData({

            isSimple: false /* 设为非简单版块 */
          });
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

  /* 返回上层 */
  returnLastPage:function () {
    wx.navigateBack({
      delta: 1
    });
  },
  /* 返回首层 */
  returnTopPage: function () {
    /* 参数大于现有层数，返回首页 */
    wx.navigateBack({
      delta: 10
    });
  },
  itemTap:function(e){
    console.log("======id==========="+e.target.id);
    wx.navigateTo({
      url: "/pages/noTabBar/doc/doc?id=" + e.target.id
    });
  }
})