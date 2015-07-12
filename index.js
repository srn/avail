'use strict';

var got = require('got');
var symbols = require('log-symbols');

module.exports = function(domain, callback){
  var path = 'https://api.domainr.com/v1/search?q=' + domain + '&client_id=avail';

  got(path, { json: true }, function (err, body) {
    if (err) {
      return callback(err);
    }

    results = results.map(function (domain) {
      var available;

      switch (domain.availability) {
        case 'tld':
          available = symbols.info;
          break;
        case 'unavailable':
          available = symbols.error;
          break;
        case 'taken':
          available = symbols.error;
          break;
        case 'available':
          available = symbols.success;
          break;
      }

      return domain.domain + domain.path + ' ' + available;
    });

    callback(results);
  });
};
