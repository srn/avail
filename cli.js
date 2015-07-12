#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var avail = require('./');
var argv = process.argv.slice(2);

var symbols = require('log-symbols');

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    avail avail.io',
    '',
    '    avail.io ' + symbols.success,
    '    avail.com ' + symbols.error
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

// TODO: split into separate module perhaps
function availabilitySymbol (availability) {
  // List of possible availabilities: http://domainr.build/v1.0/docs/search#section-availability-status
  if (availability === 'available') {
    return symbols.success;
  }

  if (availability === 'taken' || availability === 'unavailable') {
    return symbols.error;
  }

  if (availability === 'maybe' || availability === 'unknown') {
    return symbols.warning;
  }

  if (availability === 'known' || availability === 'tld') {
    return symbols.info;
  }
}

avail(argv[0], function (err, domains) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  domains.forEach(function (domain) {
    console.log(domain.domain, availabilitySymbol(domain.availability));
  });
});
