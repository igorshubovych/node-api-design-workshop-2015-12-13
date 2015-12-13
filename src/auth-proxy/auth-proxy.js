'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  oauthserver = require('node-oauth2-server'),
  http = require('http'),
  proxy = require('proxy-middleware');

const model = require('./auth-model');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: model, // See below for specification
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('*', app.oauth.authorise(), proxy('http://localhost:5000'));

app.use(app.oauth.errorHandler());

module.exports = http.createServer(app);
