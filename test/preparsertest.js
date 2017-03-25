const assert = require('assert');
const withIndentsAndDedents = require('../syntax/preparser');

const input = `function f():
       pass

def g():
  if x < 1:
       x = 3
       print(x)
  else:
     return 'z'

f()
`;

const expected = `function f():
⇨pass

⇦def g():
⇨if x < 1:
⇨x = 3
print(x)
⇦else:
⇨return 'z'

⇦⇦f()
`;

describe('The preparser', () => {
  it('can preprocess a simple program', () => {
    assert.equal(withIndentsAndDedents(input), expected);
  });
});
