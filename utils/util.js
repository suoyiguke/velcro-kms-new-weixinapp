const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function nthIndexOf(str, c, n) {
  var x = str.indexOf(c);
  for (var i = 0; i < n; i++) {
    x = str.indexOf(c, x + 1);
  }
  return x;
}

module.exports = {
  formatTime: formatTime,
  nthIndexOf: nthIndexOf
}
