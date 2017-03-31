/*
 * Parser Tests
 *
 * Tests that the parser produces the correct abstract syntax tree when it
 * should, and emits the expected errors when given syntactically incorrect
 * programs.
 */

const fs = require('fs');
const assert = require('assert');
const parse = require('../../syntax/parser');

describe('The parser', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.pls')) {
      it(`produces the correct AST for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          const ast = parse(input);
          fs.readFile(`${__dirname}/${name}.json`, 'utf-8', (_err, expected) => {
            assert.equal(JSON.stringify(ast), expected.trim());
            done();
          });
        });
      });
    }
  });
});
