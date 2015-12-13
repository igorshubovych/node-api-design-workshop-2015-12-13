'use strict';

const jsonApi = require('jsonapi-server');


jsonApi.listen = (port, callback) => {
  jsonApi.setConfig({ port });

  jsonApi.start();
  if (callback) {
    process.nextTick(callback);
  }
};

const Joi = jsonApi.Joi;

jsonApi.define({
  resource: 'articles',
  handlers: new jsonApi.MemoryHandler(),
  attributes: {
    title: Joi.string().required(),
    body: Joi.string().required(),
    publishedAt: Joi.date().iso()
  },

  examples: [{
    id: '11',
    type: 'articles',
    body: 'Exciting',
    title: 'Hello world'
  }, {
    id: '12',
    type: 'articles',
    body: 'Interesting',
    title: 'Fresh news'
  }, {
    id: '13',
    type: 'articles',
    body: 'Boring',
    title: 'Old news'
  }]
});

module.exports = jsonApi;
