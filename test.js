'use strict';

var assert = require('assert');
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

describe('avail', function(){
  it('available', function(){
    avail('avail', function (domains) {
      assert.equal(domains[0], 'avail.io ' + symbols.success);
    });
  });

  it('unavailable', function(){
    avail('avail', function (domains) {
      assert.equal(domains[1], 'avail.com ' +  symbols.error);
    });
  });
});