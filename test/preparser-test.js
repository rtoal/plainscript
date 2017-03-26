/*
 * Preparser Tests
 *
 * Tests to ensure the pre-parser produces the correct pre-parsed output when
 * it should, and emits the expected errors for badly indented programs and
 * those programs using whitespace characters other than the regular space
 * character (\u{20}).
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

  // To check whitespace errors, we are NOT going to read files. This is because
  // some text editor configurations (e.g., the ones I use) will turn tabs into
  // spaces on save. We're just going to embed the test program here.
  it('detects leading tab characters and says they are bad', (done) => {
    const input = 'def f():\n\treturn 0\n';
    assert.throws(() => withIndentsAndDedents(input), /Illegal whitespace.*?\{9\}/);
    done();
  });
  it('detects tab characters after spaces and says they are bad', (done) => {
    const input = 'def f():\n   \treturn 0\n';
    assert.throws(() => withIndentsAndDedents(input), /Illegal whitespace.*?\{9\}/);
    done();
  });
  it('detects non-breaking spaces and says they are bad', (done) => {
    const input = 'def f():\n\xA0return 0\n';
    assert.throws(() => withIndentsAndDedents(input), /Illegal whitespace.*?\{a0\}/);
    done();
  });
});
