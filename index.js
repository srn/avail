'use strict';

var request = require('request');
var symbols = require('log-symbols');

module.exports = function(domain, callback){
  var path = 'https://domainr.com/api/json/search?q='+domain+'&client_id=avail';

  request(path, function (error, response, body) {
    var results = JSON.parse(body);
    results = results.results;

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
}
