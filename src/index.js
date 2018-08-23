export default function({ types: t }) {
  var generator = require('@babel/generator').default;

  return {
    visitor: {
      ArrowFunctionExpression(path) {
        let node = path.node;
        let params = node.params.map(param => generator(param).code);
        let code = '';

        if (node.params.length === 0) {
          return;
        }

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
