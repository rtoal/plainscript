/*
 * Parser Tests
 *
 * Tests that the parser produces the expected abstract syntax tree for a
 * variety of programs.
 */

import fs from 'fs';
import util from 'util';
import parse from '../../syntax/parser';

describe('The parser', () => {
  fs.readdirSync(__dirname).forEach(name => {
    if (name.endsWith('.pls')) {
      test(`produces the correct AST for ${name}`, done => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          const ast = parse(input);
          const astText = util.inspect(ast, { depth: null, compact: true });
          fs.readFile(`${__dirname}/${name.slice(0, -3)}ast`, 'utf-8', (_err, expected) => {
            expect(astText).toEqual(expected.trim());
            done();
          });
        });
      });
    }
  });
});
