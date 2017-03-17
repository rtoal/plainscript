const assert = require('assert');
const withIndentsAndDedents = require('../syntax/preparser');

const input = `function f():
       pass

def g():
  if (x):
       pass
  else:
     pass

f()`;

const expected = `function f():
⍈pass

⍇def g():
⍈if (x):
⍈pass
⍇else:
⍈pass

⍇⍇f()`;

describe('The preparser', () => {
  it('can preprocess a simple program', () => {
    assert.equal(withIndentsAndDedents(input), expected);
  });
});
