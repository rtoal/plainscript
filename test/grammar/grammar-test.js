/*
 * Grammar Tests
 *
 * Tests that the we've constructed our grammar correctly, by checking that
 * programs that we expect to be matched by the grammar are matched, and
 * those that we expect not to cause an error to be thrown.
 */

const fs = require('fs');
const parse = require('../../syntax/parser');

describe('The grammar', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.pls')) {
      test(`matches the program ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          // In this test we just care that it parses without errors
          expect(parse(input)).toBeTruthy();
          done();
        });
      });
    } else if (name.endsWith('.error')) {
      test(`detects a syntax error in ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          // We always wrap Ohm failures in an error with text "Syntax Error"
          expect(() => parse(input)).toThrow(/Syntax Error/);
          done();
        });
      });
    }
  });
});
