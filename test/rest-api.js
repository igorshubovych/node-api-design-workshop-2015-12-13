'use strict';

const chai = require('chai'),
  assert = chai.assert;

const fetch = require('node-fetch'),
  co = require('co');

const jsonApiServer = require('../src/jsonapi-server'),
  authServer = require('../src/auth-proxy');

describe('REST API', () => {
  before(done => jsonApiServer.listen(5000, done));
  after(() => jsonApiServer.close());

  it('should return la list of articles', co.wrap(function* () {
    const response = yield fetch('http://localhost:5000/articles');
    assert(response.ok, 'Hello world response');
    const json = yield response.json();
    assert(json.data, 'should have data');
  }));

  describe('Authentication & Autherization', () => {
    before(done => authServer.listen(6000, done));
    after(() => authServer.close());

    it('should authorize', co.wrap(function* () {
      const response = yield fetch('http://localhost:6000/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + new Buffer('thom:nightworld').toString('base64')
        },
        body: 'grant_type=password&username=thomseddon&password=nightworld'
      });
      assert(response.ok, '/login response');
    }));
  });
});
