export default ({ types: t }) => {
  let mkBody = node => t.blockStatement([t.returnStatement(node)]);
  let mkArrow = (...params) => t.arrowFunctionExpression(params, mkBody());

  let visitor = {
    ArrowFunctionExpression(path) {
      let { node } = path;

      if (path.node.params.length < 2) {
        return;
      }

      let head, tail;

      node.params.forEach(param => {
        if (!tail) {
          head = tail = mkArrow(param);
        } else {
          let arrow = mkArrow(param);
          tail.body = mkBody(arrow);
          tail = arrow;
        }
      });

      tail.body = node.body;

      path.replaceWith(head);
    }
  };

  return { visitor };
};
