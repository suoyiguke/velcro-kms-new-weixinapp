function nthIndexOf(str, c, n) {
  var x = str.indexOf(c);
  for (var i = 0; i < n; i++) {
    x = str.indexOf(c, x + 1);
  }
  return x;
}

module.exports = {
  nthIndexOf: nthIndexOf
}
