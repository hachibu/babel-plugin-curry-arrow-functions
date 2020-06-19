import assert     from 'assert';
import * as babel from '@babel/core';
import * as fs    from 'fs';
import plugin     from '../lib/index';

describe('curry-arrow-functions', () => {
  let paths = fs.
    readdirSync('test').
    map(name => `test/${name}`).
    filter(path => fs.lstatSync(path).isDirectory());

  paths.forEach(path => {
    it(path, () => {
      let input = babel.transformFileSync(`${path}/input.js`, { plugins: [plugin] });
      let output = fs.readFileSync(`${path}/output.js`, 'utf-8').trim();

      assert.equal(input.code, output);
    });
  });
});
