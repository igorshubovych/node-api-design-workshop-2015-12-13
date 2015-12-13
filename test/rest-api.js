'use strict';

const chai = require('chai'),
  assert = chai.assert;

const fetch = require('node-fetch'),
  co = require('co');

const server = require('../src/jsonapi-server');

describe('REST API', () => {
  before(done => server.listen(5000, done));
  after(() => server.close());

  it('should return la list of articles', co.wrap(function* () {
    const response = yield fetch('http://localhost:5000/articles');
    assert(response.ok, 'Hello world response');
    const json = yield response.json();
    assert(json.data, 'should have data');
  }));
});
