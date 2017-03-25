const fs = require('fs');
const assert = require('assert');
const parse = require('../syntax/parser');
const error = require('../error/error');

const TEST_DIR = './test/good-programs';

describe('The parser', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    it(`should check the syntax of ${name} without errors`, (done) => {
      /* const program = */
      console.log(`Looking for ${TEST_DIR}/${name}`);
      parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      const priorErrorCount = error.count;
      // program.analyze();
      assert.equal(priorErrorCount, 0);
      done();
    });
  });
});
