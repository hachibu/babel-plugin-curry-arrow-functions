import generate from 'babel-generator';
import _ from 'lodash';

export default function({ types: t }) {
  const generateCode = (ast) => generate(ast).code;

  return {
    visitor: {
      ArrowFunctionExpression(path) {
        let { node } = path;

        if (_.isEmpty(node.params)) {
          return;
        }

        let source = '';
        let paramCodes = _.map(node.params, generateCode);
        let bodyCode = generateCode(node.body);

        _.each(paramCodes, (paramCode, i) => {
          source += `function (${paramCode}) {`;
          if (i < paramCodes.length - 1) {
            source += 'return ';
          }
        });

        source += node.body.type === 'BlockStatement'
                ? bodyCode
                : `return ${bodyCode}`;

        _.times(paramCodes.length, () => source += '}');

        path.replaceWithSourceString(source);
      }
    }
  };
};
