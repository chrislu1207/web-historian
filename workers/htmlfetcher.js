// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');
var request = require('request');
var fs = require('fs');

archive.readListOfUrls(function(urls) {
  urls.forEach(function(url) {
    request('http://' + url, function (error, response, body) {
      if (!error) {
        fs.writeFile(archive.paths.archivedSites + '/' + url, body, function(err) {
          if (err) { console.log('Failed to download html'); }
        });
      }
    });
  });
});