"use strict";

(function (a) {
  return function (b) {
    return a + b;
  };
});
(function (a) {
  return function (b) {
    {
      return a + b;
    }
  };
});
(function () {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return function () {
    var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
    return a + b;
  };
});
