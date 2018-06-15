
/* 封装获取评论的喜欢数的同步请求 */
var requestReplyLikeNum = function(itemId,num){
var array =[];
for (var i = 0; i < num; i++) {

  let promisevariable = new Promise(function (resolve, reject) {
    wx.request({
      url: "http://119.29.176.106:8090/kms/common/updown/getCount.do",
      data: {
        objId: itemId,
        module: 'reply',
        type: "up"
      },
      method: "POST",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("============同步请求：=======================");
        console.log(res.data);
      }
    });
    /* 请求结束 */
  });

  array.push(promisevariable);
}





Promise.all(array).then(function (values) {  //这里就可以顺序执行并得到每个结果
    console.log(values);

  });

}