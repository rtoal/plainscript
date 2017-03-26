/*
 * Preparser module
 *
 *   const withIndentsAndDedents = require('./preparser');
 *
 *   withIndentsAndDedents(text)
 *       Returns text with ⇨ characters replacing indent regions and ⇦
 *       replacing dedents. If the program text is misindented, or has
 *       any whitespace other than a space character in the indentation
 *       region, the function will throw an error.
 */

module.exports = (text) => {
  const stack = [0];
  const result = [];
  for (const line of text.split('\n')) {
    const lineMatch = /^( *)(.*)/.exec(line);
    const [indent, content] = [lineMatch[1].length, lineMatch[2]];
    if (content === '') {
      result.push('');
    } else if (/\s/.test(content[0])) {
      throw new Error('Illegal whitespace character');
    } else if (indent === stack[stack.length - 1]) {
      result.push(content);
    } else if (indent > stack[stack.length - 1]) {
      stack.push(indent);
      result.push(`⇨${content}`);
    } else {
      for (let dedents = 1; true; dedents += 1) {
        const next = (stack.pop(), stack[stack.length - 1]);
        if (indent > next) {
          throw new Error('Indent Error');
        } else if (indent === next) {
          result.push(`${'⇦'.repeat(dedents)}${content}`);
          break;
        }
      }
    }
  }
  return result.join('\n');
};
