var generator = require('@babel/generator').default;

module.exports = function(babel) {
  return {
    visitor: {
      ArrowFunctionExpression(path) {
        let node = path.node;
        let params = node.params.map(param => generator(param).code);
        let code = '';

        params.forEach((arg, i) => {
          code += `function (${arg}) { `;
          if (i < params.length - 1) {
            code += 'return ';
          }
        });
        if (node.body.type !== 'BlockStatement') {
          code += 'return ';
        }
        code += generator(node.body).code;
        params.forEach(a => code += ' }');

        path.replaceWithSourceString(code);
      }
    }
  };
};
