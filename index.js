'use strict';

var got = require('got');
var symbols = require('log-symbols');

module.exports = function(domain, callback){
  var path = 'https://api.domainr.com/v1/search?q=' + domain + '&client_id={your-mashape-key}';

  got(path, { json: true }, function (err, body) {
    if (err) {
      return callback(err);
    }

    var results = body.results.map(function (result) {
      return {
        domain: result.domain + result.path,
        availability: result.availability
      };
    });

    callback(null, results);
  });
};
