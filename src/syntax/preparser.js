/*
 * Preparser module
 *
 *   const withIndentsAndDedents = require('./preparser');
 *
 *   withIndentsAndDedents(source)
 *       Returns text with ⇨ characters replacing indent regions and ⇦
 *       replacing dedents. If the source text is misindented, or has
 *       any whitespace other than a space character in the indentation
 *       region, the function will throw an error.
 *
 *   That's right: the only whitespace character allowed for indenting is
 *   the plain old space character, \x20. All other whitespace, including
 *   tabs, are illegal.
 */

module.exports = (source) => {
  const stack = [0];
  let result = '';
  const text = source.endsWith('\n') ? source : `${source}\n`;
  const linePattern = /( *)([^\n]*\n)/g;

  for (let match = linePattern.exec(text); match !== null; match = linePattern.exec(text)) {
    const [indent, content] = [match[1].length, match[2]];

    if (content === '\n') {
      // Empty line
      result += content;
    } else if (/\s/.test(content[0])) {
      // First non-space character is whitespace, may be confusing so error
      throw new Error(`Illegal whitespace character: \\u{${content.charCodeAt(0).toString(16)}}`);
    } else if (indent === stack[stack.length - 1]) {
      // This line is on the same indent level as the last line, proceed
      result += content;
    } else if (indent > stack[stack.length - 1]) {
      // This line has moved in, so push the new level and emit an indent token
      stack.push(indent);
      result += `⇨${content}`;
    } else {
      // We've come out, so keep popping and emitting dedent tokens until done or error
      for (let dedents = 1; true; dedents += 1) {
        const next = (stack.pop(), stack[stack.length - 1]);
        if (indent > next) {
          throw new Error('Indent Error');
        } else if (indent === next) {
          result += `${'⇦'.repeat(dedents)}${content}`;
          break;
        }
      }
    }
  }

  // Add in any required dedents at the end
  if (stack.length > 1) {
    result += `${'⇦'.repeat(stack.length - 1)}\n`;
  }
  return result;
};
