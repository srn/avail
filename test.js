'use strict';

const assert = require('assert');
const nock = require('nock');

const avail = require('./');

const statusFixture = {
  status: [{
    domain: 'avail.io',
    zone: 'io',
    status: 'active',
    summary: 'active'
  }]
};

nock('https://api.domainr.com/v2')
  .get('/status?domain=avail.io&client_id=d03affbe48744f2e8a2e8453e5d3f27f')
  .reply(200, statusFixture);

var whoisFixture = {
  domain: "avail.io",
  whoisText: "\nDomain : avail.io\nStatus : Live\nExpiry : 2016-05-10\n"
};

nock('https://api.domainr.com/v2')
  .get('/whois?domain=avail.io&client_id=d03affbe48744f2e8a2e8453e5d3f27f')
  .reply(200, whoisFixture);

describe('avail', () => {
  it('status / whois', done => {
    avail('avail.io')
      .then(result => {
        assert.notEqual(result[0].body.status, void 0);
        assert.equal(result[0].body.status.length, 1);
        assert.equal(result[0].body.status[0].domain, 'avail.io');
        assert.equal(result[0].body.status[0].summary, 'active');

        assert.equal(result[1].body.whoisText, whoisFixture.whoisText);

        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });
});
