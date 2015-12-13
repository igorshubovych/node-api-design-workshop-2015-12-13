'use strict';

const chai = require('chai'),
  assert = chai.assert;

const fetch = require('node-fetch'),
  co = require('co');

const server = require('../src/hello-server');

describe('hello world', () => {
  before(done => server.listen(4000, done));
  after(() => server.close());

  it('should respond to requests', co.wrap(function* () {
    const response = yield fetch('http://localhost:4000/');
    assert(response.ok, 'Hello world response');
    const text = yield response.text();
    assert(text === 'Hello world', 'should say hello world');
  }));
});
