import _          from 'lodash';
import assert     from 'assert';
import * as babel from 'babel-core';
import * as fs    from 'fs';
import plugin     from '../dist/index';

var paths = _(fs.readdirSync('test'))
  .map(name => _.join(['test', name], '/'))
  .filter(path => fs.lstatSync(path).isDirectory())
  .value();

describe('plugin', function() {
  _.each(paths, function(path) {
    it(`should transform ${path}`, function() {
      var inputPath = `${path}/input.js`,
          outputPath = `${path}/output.js`;

      if (!fs.existsSync(inputPath) || !fs.existsSync(outputPath)) {
        this.skip();
      }

      var input = babel.transformFileSync(inputPath, { plugins: [plugin] }),
          output = _.trim(fs.readFileSync(outputPath, 'utf-8'));

      assert.equal(input.code, output);
    });
  });
});
