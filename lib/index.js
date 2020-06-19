"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var t = _ref.types;

  var mkBody = function mkBody(node) {
    return t.blockStatement([t.returnStatement(node)]);
  };

  var mkArrow = function mkArrow() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return t.arrowFunctionExpression(params, mkBody());
  };

  var visitor = {
    ArrowFunctionExpression: function ArrowFunctionExpression(path) {
      var node = path.node;

      if (path.node.params.length < 2) {
        return;
      }

      var head, tail;
      node.params.forEach(function (param) {
        if (!tail) {
          head = tail = mkArrow(param);
        } else {
          var arrow = mkArrow(param);
          tail.body = mkBody(arrow);
          tail = arrow;
        }
      });
      tail.body = node.body;
      path.replaceWith(head);
    }
  };
  return {
    visitor: visitor
  };
};

exports["default"] = _default;