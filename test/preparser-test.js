/*
 * Preparser Tests
 *
 * Tests to ensure the pre-parser produces the correct pre-parsed output when
 * it should, and emits the expected errors for badly indented programs.
 */

const fs = require('fs');
const assert = require('assert');
const withIndentsAndDedents = require('../syntax/preparser');

const TEST_DIR = './test/preparser-checks';

describe('The pre-parser', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.carlitos')) {
      it(`produces the correct indent/dedent markup for ${name}`, (done) => {
        fs.readFile(`${TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          fs.readFile(`${TEST_DIR}/${name}.expected`, 'utf-8', (_err, expected) => {
            assert.equal(withIndentsAndDedents(input), expected);
            done();
          });
        });
      });
    } else if (name.endsWith('.indent-error')) {
      it(`detects indentation errors in ${name}`, (done) => {
        fs.readFile(`${TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          assert.throws(() => withIndentsAndDedents(input), /Indent Error/);
          done();
        });
      });
    }
  });
});
