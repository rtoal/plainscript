/*
 * Error module
 *
 *   const error = require('./error');
 *
 *   error('Something happened', {line: 7, col: 22});
 *   error('Illegal start of expression', token);
 *   error.quiet = true;
 *   error('That\'s strange');
 *   error('Type mismatch', {line: 100});
 *   console.log(error.count);
 */

function error(message, location) {
  let output = message;
  if (location && location.line) {
    output += ` at line ${location.line}`;
    if (location.col) {
      output += `, column ${location.col}`;
    }
  }
  if (!error.quiet) {
    console.error(`Error: ${output}`);
  }
  error.count += 1;
}

error.quiet = false;

error.count = 0;

module.exports = error;
