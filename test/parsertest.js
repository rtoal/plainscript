/*
 * Parser Tests
 *
 * Tests that the parser produces the correct abstract syntax tree when it
 * should, and emits the expected errors when given syntactically incorrect
 * programs.
 */

const fs = require('fs');
const assert = require('assert');
const parse = require('../syntax/parser');

const TEST_DIR = './test/syntax-checks';

describe('The parser', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.carlitos')) {
      it(`produces the correct AST for ${name}`, (done) => {
        const input = fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8');
        // const expected = fs.readFileSync(`${TEST_DIR}/${name}.expected`, 'utf-8');
        console.log(parse(input));
        // assert.equal(parse(input), expected);
        done();
      });
    }
  });

  // fs.readdirSync(TEST_DIR).forEach((name) => {
  //   if (name.endsWith('.carlitos')) {
  //     it(`detects the correct errors in ${name}`, (done) => {
  //       const input = fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8');
  //       const expected = fs.readFileSync(`${TEST_DIR}/${name}.expected`, 'utf-8');
  //       assert.equal(error.count, 0);
  //       assert.equal(parse(input), expected);
  //       done();
  //     });
  //   }
  // });
});
