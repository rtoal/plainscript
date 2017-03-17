const ohm = require('ohm-js');
const fs = require('fs');
const error = require('../error/error');
const withIndentsAndDedents = require('./preparser');

const grammar = ohm.grammar(fs.readFileSync('./carlitos.ohm'));

function ast(match) {
  // TODO Ohm Semantics
  return match.succeeded();
}

function parse(text) {
  const preprocessedText = withIndentsAndDedents(text);
  if (error.count > 0) {
    return '';
  }
  const match = grammar.match(withIndentsAndDedents(preprocessedText));
  return match.succeeded() ? ast(match) : error(match.message);
}

module.exports = parse;
