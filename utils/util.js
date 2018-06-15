

/* 截取字符串 */
/*
   参数1 数组
   参数2 item对象需要截取的value对应的key值 */
var subString = function (array, key) {
  array.forEach((item) => {

  if (key == "name") {
    if (item.name == void (0) || (item.name == '')) {
      return true;/* 跳过此次循环 */
    }
    if (item.name.length > 15) {
      item.name = item.name.substring(0, 15) + "...";
    }
  } else if (key == "title"){
    if (item.title == void (0) || (item.title == '')) {
      return true;/* 跳过此次循环 */
    }
    if (item.title.length > 15) {
      item.title = item.title.substring(0, 15) + "...";
    }
  } else if (key == "teamname") {
    if (item.teamname == void (0) || (item.teamname == '')) {
      return true;/* 跳过此次循环 */
    }
    if (item.teamname.length > 25) {
      item.teamname = item.teamname.substring(0, 25) + "...";
    }
  } else if (key == "summary") {
    if (item.summary == void (0) || (item.summary == '')) {
      return true;/* 跳过此次循环 */
    }
    if (item.summary.length > 15) {
      item.summary = item.summary.substring(0, 15) + "...";
    }
  } else if (key == "description") {
    if (item.description == void (0) || (item.description == '')) {
      return true;/* 跳过此次循环 */
    }
    if (item.description.length > 15) {
      item.description = item.description.substring(0, 15) + "...";
    }
  }
  
  });

}

module.exports = {
  subString: subString
}
