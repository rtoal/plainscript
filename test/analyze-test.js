const fs = require('fs');
const assert = require('assert');
const parse = require('../syntax/parser');

const TEST_DIR = './test/analyzer-checks';

describe('The semantic analyzer', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.error')) {
      it(`detects a ${name.replace(/[^a-z]/g, ' ')}`, (done) => {
        const program = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
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
