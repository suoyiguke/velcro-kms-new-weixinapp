// pages/noTabBar/doc/doc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "文档",
    lastTitle: "返回",
    dac1List:[],
    isSimple: true /* 是否为简单版块？默认是 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    console.log("=================id=========="+id);
    if (id == void(0)){
       id="";
    }
    /*  发起接口请求--已办 */
    wx.request({
      url: "http://119.23.255.13:8098/mobile/execute.do?action=getDocbaseList&creator=8ae08bac4235c9cf01423696a91708c6&currentPage=1&id=" + id + "&model=DocbaseList&pageSize=20",
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
        
          dac1List: res.data.pageBean.recordList
        });

        if (that.data.dac1List === undefined || that.data.dac1List.length == 0) {
           console.log("===============数组1为空");
        } 
        
        if (that.data.dac1List[0].creator == void(0)){
          console.log("=========没有作者，属于简单版块============" + that.data.dac1List.creator);
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

  /* 返回 */
  returnLastPage: function () {
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