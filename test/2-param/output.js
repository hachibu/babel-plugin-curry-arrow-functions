"use strict";

var add_1 = function add_1(a) {
  return function (b) {
    return a + b;
  };
};
var add_2 = function add_2(a) {
  return function (b) {
    {
      return a + b;
    }
  };
};
var add_3 = function add_3() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return function () {
    var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
    return a + b;
  };
};
