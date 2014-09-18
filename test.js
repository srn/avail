'use strict';

var test = require('ava');
var nock = require('nock');
var avail = require('./');
var symbols = require('log-symbols');

var fixtures = {
  results: [
    {
      domain: 'avail.io',
      path: '',
      availability: 'available'
    },
    {
      domain: 'avail.com',
      path: '',
      availability: 'unavailable'
    }
  ]
};

nock('https://domai.nr')
  .get('/api/json/search?q=avail&client_id=avail')
  .reply(200, fixtures);

test(function (t) {
  t.plan(2);

  avail('avail', function (domains) {
    t.assert(domains[0] === 'avail.io ' + symbols.success);
    t.assert(domains[1] === 'avail.com ' +  symbols.error);

    t.end();
  });
});
