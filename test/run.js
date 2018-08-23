var _       = require('lodash'),
    assert  = require('assert'),
    babel   = require('babel-core'),
    fs      = require('fs'),
    plugin  = require('../dist/index').default;

var paths =
  _(fs.readdirSync('test'))
    .map(name => _.join(['test', name], '/'))
    .filter(path => fs.lstatSync(path).isDirectory())
    .value();

_.each(paths, (path) => {
  it(`transforms ${path}`, () => {
    var input = babel.transformFileSync(`${path}/input.js`, {
      plugins: [plugin]
    });
    var output = _.trim(fs.readFileSync(`${path}/output.js`, 'utf-8'));

    assert.equal(input.code, output);
  });
});
