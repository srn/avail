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

avail(argv[0], function(domains){
  domains.forEach(function (domain) {
    console.log(domain);
  });
});
