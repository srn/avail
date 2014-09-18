'use strict';

var test = require('ava');
var nock = require('nock');
var avail = require('./');

var fixtures = [
  {
    domain: 'avail.io',
    availability: 'available'
  },
  {
    domain: 'avail.com',
    availability: 'unavailable'
  }
];

nock('https://domai.nr')
  .get('/api/json/search?q=avail&client_id=avail')
  .reply(200, fixtures);

test(function (t) {
  avail('avail', function (domains) {
    t.assert(domains[0], fixtures[0]);
    t.assert(domains[1], fixtures[1]);

    t.end();
  });
});
