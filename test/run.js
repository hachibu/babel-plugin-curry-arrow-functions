import _          from 'lodash';
import assert     from 'assert';
import * as babel from 'babel-core';
import * as fs    from 'fs';
import plugin     from '../dist/index';

var paths = _(fs.readdirSync('test'))
  .map(name => _.join(['test', name], '/'))
  .filter(path => fs.lstatSync(path).isDirectory())
  .value();

describe('plugin', () => {
  _.each(paths, (path) => {
    it(`should transform ${path}`, () => {
      var input = babel.transformFileSync(`${path}/input.js`, {
        plugins: [plugin]
      });
      var output = _.trim(fs.readFileSync(`${path}/output.js`, 'utf-8'));

      assert.equal(input.code, output);
    });
  });
});
