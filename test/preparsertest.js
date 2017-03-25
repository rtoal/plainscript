/*
 * Preparser Tests
 *
 * Tests that the pre-parser produces the correct pre-parsed output when it
 * should, and emits the expected errors when given badly indented programs.
 */

const fs = require('fs');
const assert = require('assert');
const withIndentsAndDedents = require('../syntax/preparser');

const TEST_DIR = './test/preparser-checks';

describe('The pre-parser', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.carlitos')) {
      it(`produces the correct markup for ${name}`, (done) => {
        const input = fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8');
        const expected = fs.readFileSync(`${TEST_DIR}/${name}.expected`, 'utf-8');
        assert.equal(withIndentsAndDedents(input), expected);
        done();
      });
    }
  });
});
