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
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    } else {
      httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + req.url);
    }
  },

  'POST': function(req, res) {
    httpHelpers.collectData(req, function(data) {
      console.log(data);
    });
  },

  'OPTIONS': function(req, res) {

  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);