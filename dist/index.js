'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var generateCode = function generateCode(ast) {
    return (0, _babelGenerator2.default)(ast).code;
  };

  return {
    visitor: {
      ArrowFunctionExpression: function ArrowFunctionExpression(path) {
        var node = path.node;


        if (node.params.length < 2) {
          return;
        }

        var source = '';
        var paramCodes = _lodash2.default.map(node.params, generateCode);
        var bodyCode = generateCode(node.body);

        _lodash2.default.each(paramCodes, function (paramCode, i) {
          source += 'function (' + paramCode + ') {';
          if (i < paramCodes.length - 1) {
            source += 'return ';
          }
        });

        source += node.body.type === 'BlockStatement' ? bodyCode : 'return ' + bodyCode;

        _lodash2.default.times(paramCodes.length, function () {
          return source += '}';
        });

        path.replaceWithSourceString(source);
      }
    }
  };
};

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;