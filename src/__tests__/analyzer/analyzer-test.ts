/*
 * Semantic Analysis Tests
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

import fs from 'fs';
import parse from '../../syntax/parser';

describe('The semantic analyzer', () => {
  fs.readdirSync(__dirname).forEach((name: any) => {
    if (name.endsWith('.error')) {
      test(`detects a ${name.replace(/[^a-z]/g, ' ')}`, done => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8').toString());
        const errorPattern = RegExp(name.replace('.error', '').replace(/-/g, ' '), 'i');
        expect(() => program.analyze()).toThrow(errorPattern);
        done();
      });
    } else if (name.endsWith('.pls')) {
      test(`should analyze ${name} without errors`, done => {
        // For now, we are happy to know that these files pass semantic analysis.
        // We eventually need to check that the ASTs are properly decorated.
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        program.analyze();
        done();
      });
    }
  });
});
