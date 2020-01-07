/*
 * Preparser Tests
 *
 * Tests to ensure the pre-parser produces the correct pre-parsed output when
 * it should, and emits the expected errors for badly indented programs and
 * those programs using whitespace characters other than the regular space
 * character (\u{20}).
 */

const fs = require('fs');
const withIndentsAndDedents = require('../../syntax/preparser');

describe('The pre-parser', () => {
  // When testing that the preprocessor works as intended, we scan a bunch of
  // files in this directory, including both source code files (.ps) and the
  // expected results (.pls.expected). The test script picks up all the files
  // it finds, based on file names, and processes them and checks them against
  // their expectations.
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.pls')) {
      test(`produces the correct indent/dedent markup for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          fs.readFile(`${__dirname}/${name}.expected`, 'utf-8', (_err, expected) => {
            expect(withIndentsAndDedents(input)).toEqual(expected);
            done();
          });
        });
      });
    } else if (name.endsWith('.indent-error')) {
      test(`detects indentation errors in ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          expect(() => withIndentsAndDedents(input)).toThrow(/Indent Error/);
          done();
        });
      });
    }
  });

  // Here's a test to make sure we can tolerate files that don't end with
  // newline characters. These aren't kept in files because some text editor
  // configurations automatically add the newlines.
  test('handles files that do not end with newlines', (done) => {
    const input = 'def f():\n  return 0';
    expect(withIndentsAndDedents(input)).toEqual('def f():\n⇨return 0\n⇦\n');
    done();
  });

  // To check whitespace errors, we are NOT going to read files. This is because
  // some text editor configurations (e.g., the ones I use) will turn tabs into
  // spaces on save. We're just going to embed the test program here.
  test('detects leading tab characters and says they are bad', (done) => {
    const input = 'def f():\n\treturn 0\n';
    expect(() => withIndentsAndDedents(input)).toThrow(/Illegal whitespace.*?\{9\}/);
    done();
  });
  test('detects tab characters after spaces and says they are bad', (done) => {
    const input = 'def f():\n   \treturn 0\n';
    expect(() => withIndentsAndDedents(input)).toThrow(/Illegal whitespace.*?\{9\}/);
    done();
  });
  test('detects non-breaking spaces and says they are bad', (done) => {
    const input = 'def f():\n\xA0return 0';
    expect(() => withIndentsAndDedents(input)).toThrow(/Illegal whitespace.*?\{a0\}/);
    done();
  });
});
