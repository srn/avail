'use strict';

var assert = require('assert');
var nock = require('nock');
var avail = require('./');

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
    },
    {
      domain: 'avail.com',
      path: '/pathtest',
      availability: 'unavailable'
    }
  ]
};

nock('https://domainr.com')
  .get('/api/json/search?q=avail&client_id=avail')
  .reply(200, fixtures);

describe('avail', function(){
  it('available', function(){
    avail('avail', function (domains) {
      assert.equal(domains[0].domain, 'avail.io');
      assert.equal(domains[0].availability, 'available');
    });
  });

  it('unavailable', function(){
    avail('avail', function (domains) {
      assert.equal(domains[1].domain, 'avail.com');
      assert.equal(domains[1].availability, 'unavailable');
    });
  });

  it('result with path', function(){
    avail('avail', function (domains) {
      assert.equal(domains[2].domain, 'avail.com/pathtest');
      assert.equal(domains[2].availability, 'unavailable');
    });
  });
});
