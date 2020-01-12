/*
 * Generator Tests
 *
 * Tests that the generated target code, when run, produces the expected output.
 */

import { spawn } from 'child_process';
import fs from 'fs';
import { compile } from '../../src/plainscript';

describe('The code generator', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.pls')) {
      test(`produces a behaviorally correct target for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          const target = compile(input, {});
          const child = spawn('node', ['-e', target]);
          let output = '';
          child.stdout.on('data', (data) => { output += data; });
          child.on('close', () => {
            fs.readFile(`${__dirname}/${name}.expected`, 'utf-8', (_, expected) => {
              expect(output).toEqual(expected);
              done();
            });
          });
        });
      });
    }
  });
});
