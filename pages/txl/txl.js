var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "通讯录",
    option1: true,
    option2: false,
    option3: false,
    optionTitle: ["所有人","常用","我的下属"],
    urlPrefix: app.globalData.urlPrefix,
    syrList:[],
    cyList:[],
    wdxsList:[]
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
    this.setData({
      options: options,
      urlPrefix: app.globalData.urlPrefix
    });
    var that = this;

    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getHumresList&creator=" + app.globalData.userId+"&currentPage=1&model=addressList&pageSize=20&type=all&userid=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("==============1============");
        console.log(res.data);
        console.log(res.data.pageBean.recordList);
        that.pjString(res.data.pageBean.recordList);

        that.setData({
          syrList: res.data.pageBean.recordList
        });
        //调用构建检索逻辑的json
        that.serachJson(res.data.pageBean.recordList);
        //将原数据存入缓存1
        wx.setStorage({
          key: 'syrList',
          data: res.data.pageBean.recordList,
        });

      }
    });



    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getHumresList&creator=" + app.globalData.userId+"&currentPage=1&model=addressList&pageSize=20&type=always&userid=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("==============2============");

        console.log(res.data);
        console.log(res.data.pageBean.recordList);
        that.pjString(res.data.pageBean.recordList);
        that.setData({
          cyList: res.data.pageBean.recordList
        });

        //调用构建检索逻辑的json
        that.serachJson(res.data.pageBean.recordList);
        //将原数据存入缓存2
        wx.setStorage({
          key: 'cyList',
          data: res.data.pageBean.recordList
        });

      }
    });


    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getHumresList&creator=" + app.globalData.userId +"&currentPage=1&model=addressList&pageSize=20&type=subordinate&userid=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("==============3============");

        console.log(res.data);
        console.log(res.data.pageBean.recordList);
        that.pjString(res.data.pageBean.recordList);

        that.setData({
          wdxsList: res.data.pageBean.recordList
        });

        //调用构建检索逻辑的json
        that.serachJson(res.data.pageBean.recordList);
        //将原数据存入缓存3
        wx.setStorage({
          key: 'wdxsList',
          data: res.data.pageBean.recordList
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
  serachJson:function (arr) {

    //构建检索的json格式
    for (var j = 0, len = arr.length; j < len; j++) {
      //插入show字段
      arr[j].show = true;
      //插入拼接的搜索业务字段name
      arr[j].name = arr[j].stationName + arr[j].objname;
      //插入拼接的搜索业务字段search
      arr[j].search = arr[j].stationName + arr[j].objname;

    }
  },
  input1: function (e) {//输入时，实时调用的方法
    this.search(e.detail.value);

  },
  confirm1: function (e) {//软键盘搜索
    this.search(e.detail.value);

  },
  search: function (key) { //搜索方法 key 查询字段
    var that = this;
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];

    //==============待办=======================================

    try {
      var value1 = wx.getStorageSync('syrList');
      console.log(value1);

      for (let i in value1) {
        value1[i].show = false;//所有数据隐藏
        if (value1[i].search.indexOf(key) >= 0) {//查找
          value1[i].show = true;//匹配到的数据显示
          arr1.push(value1[i]);
        }
      }
    } catch (e) {
      // Do something when catch error
    }



    //==============2=======================================
    try {
      var value2 = wx.getStorageSync('cyList');
      console.log(value2);

      for (let i in value2) {
        value2[i].show = false;//所有数据隐藏
        if (value2[i].search.indexOf(key) >= 0) {//查找
          value2[i].show = true;//匹配到的数据显示
          arr2.push(value2[i]);
        }
      }
    } catch (e) {
      // Do something when catch error
    }

    //==============3=======================================

    try {
      var value3 = wx.getStorageSync('wdxsList');
      console.log("=======xxc3========");
      console.log(value3);

      for (let i in value3) {
        value3[i].show = false;//所有数据隐藏
        if (value3[i].search.indexOf(key) >= 0) {//查找
          value3[i].show = true;//匹配到的数据显示
          arr3.push(value3[i]);
        }
      }
    } catch (e) {
      // Do something when catch error
    }

    that.setData({
      syrList: arr1,
      cyList: arr2,
      wdxsList: arr3,
    });

    if (key == "") {
      that.setData({
        syrList: value1,
        cyList: value2,
        wdxsList: value3
      });
    }

  },
  pjString: function(arr){
    for (var j = 0, len = arr.length; j < len; j++) {
      if (arr[j].imgfile !=void(0)){

      arr[j].imgfile = this.data.urlPrefix +"ServiceAction/com.velcro.base.file.ShowPicAction?attachid="+arr[j].imgfile
      }

    }
  }

})