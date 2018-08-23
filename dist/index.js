'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var generator = require('@babel/generator').default;

  return {
    visitor: {
      ArrowFunctionExpression: function ArrowFunctionExpression(path) {
        var node = path.node;
        var params = node.params.map(function (param) {
          return generator(param).code;
        });
        var code = '';

        if (node.params.length === 0) {
          return;
        }

        params.forEach(function (arg, i) {
          code += 'function (' + arg + ') { ';
          if (i < params.length - 1) {
            code += 'return ';
          }
        });
        if (node.body.type !== 'BlockStatement') {
          code += 'return ';
        }
        code += generator(node.body).code;
        params.forEach(function (a) {
          return code += ' }';
        });

        path.replaceWithSourceString(code);
      }
    }
  };
};

;