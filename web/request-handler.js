var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

// exports.handleRequest = function (req, res) {
//   fs.readFile(path.join(__dirname, './public/index.html'), 'utf8', function(err, html) {
//     if (err) {
//       console.log ('error');
//     }
//     res.writeHead(200, {'Content-Type': 'text/html'});    
//     res.end(html);
//   });
// };

var actions = {
  'GET': function(req, res) {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', 200);
    } else {
      httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + req.url, 200);
    }
  },

  'POST': function(req, res) {
    httpHelpers.collectData(req, function(data) {
      var url = data.slice(4);
      //console.log('User input', url);
      //console.log('URL is', url);
      if (archive.isUrlInList(url, function (exists) {
        return exists;
      })) {
        console.log(url, 'exists in list');
        if (archive.isUrlArchived(url, function (exists) {
          return exists;
        })) {
          console.log(url, 'exists in archive');
          console.log('Loading', url);
          httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 200);
        } else {
          console.log(url, 'does not exist in archive');
          httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 200);
        }
      } else {
        archive.addUrlToList(url, function () {
          console.log(url, 'not in list, adding', url, 'to list');
        });
        httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302);
      }

    });
  },

  'OPTIONS': function(req, res) {

  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);