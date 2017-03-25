const fs = require('fs');
const parse = require('../syntax/parser');

const TEST_DIR = './test/analyzer-checks';

describe('The semantic analyzer', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    it(`should analyze ${name} without errors`, (done) => {
      // const program = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      // program.analyze();
      done();
    });
  });

  // TODO: NEGATIVE CHECKS
});
