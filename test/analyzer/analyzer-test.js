/*
 * Semantic Analysis Tests
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

const fs = require('fs');
const assert = require('assert');
const parse = require('../../syntax/parser');

describe('The semantic analyzer', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.error')) {
      it(`detects a ${name.replace(/[^a-z]/g, ' ')}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        const errorPattern = RegExp(name.replace('.error', '').replace(/-/g, ' '), 'i');
        assert.throws(() => program.analyze(), errorPattern);
        done();
      });
    }
    // it(`should analyze ${name} without errors`, (done) => {
    //   // const program = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
    //   // program.analyze();
    //   done();
    // });
  });

  // TODO: NEGATIVE CHECKS
});
