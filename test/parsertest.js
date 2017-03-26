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

const SYNTAX_TEST_DIR = './test/syntax-checks';
const PARSER_TEST_DIR = './test/parser-checks';

describe('The grammar', () => {
  fs.readdirSync(SYNTAX_TEST_DIR).forEach((name) => {
    if (name.endsWith('.carlitos')) {
      it(`matches the program ${name}`, (done) => {
        const input = fs.readFileSync(`${SYNTAX_TEST_DIR}/${name}`, 'utf-8');
        parse(input);
        // console.log(util.inspect(parse(input), { depth: 10 }));
        done();
      });
    } else if (name.endsWith('.error')) {
      it(`detects the correct errors in ${name}`, (done) => {
        const input = fs.readFileSync(`${SYNTAX_TEST_DIR}/${name}`, 'utf-8');
        assert.throws(() => parse(input)); // TODO SAY WHAT KIND OF THROW
        done();
      });
    }
  });
});

describe('The parser', () => {
  fs.readdirSync(PARSER_TEST_DIR).forEach((name) => {
    if (name.endsWith('.carlitos')) {
      it(`produces the correct AST for ${name}`, (done) => {
        const input = fs.readFileSync(`${PARSER_TEST_DIR}/${name}`, 'utf-8');
        //
        // TODO assert parsed input is as expected
        //
        done();
      });
    }
  });
});
