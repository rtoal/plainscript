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
        fs.readFile(`${SYNTAX_TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          // In this test we just care that it parses without errors
          assert.ok(parse(input));
          done();
        });
      });
    } else if (name.endsWith('.error')) {
      it(`detects a syntax error in ${name}`, (done) => {
        fs.readFile(`${SYNTAX_TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          assert.throws(() => parse(input), /Syntax Error/);
          done();
        });
      });
    }
  });
});

describe('The parser', () => {
  fs.readdirSync(PARSER_TEST_DIR).forEach((name) => {
    if (name.endsWith('.carlitos')) {
      it(`produces the correct AST for ${name}`, (done) => {
        fs.readFile(`${PARSER_TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          const ast = parse(input);
          fs.readFile(`${PARSER_TEST_DIR}/${name}.json`, 'utf-8', (_err, expected) => {
            assert.equal(JSON.stringify(ast), expected.trim());
            done();
          });
        });
      });
    }
  });
});
