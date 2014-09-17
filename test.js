'use strict';

var test = require('ava');
var nock = require('nock');
var avail = require('./');

nock('https://domai.nr')
  .get('/api/json/search?q=avail&client_id=avail')
  .reply(200,
    [
      {
        domain: 'avail.io',
        availability: 'available'
      },
      {
        domain: 'avail.com',
        availability: 'unavailable'
      }
    ]
  );

test(function (t) {
  avail('avail', function (domains) {
    domain = domains[0];

    t.assert(domains[0], {domain: 'avail.io', availability: 'available'});
    t.assert(domains[1], {domain: 'avail.com', availability: 'unavailable'});

    t.end();
  });
});
