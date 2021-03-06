var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var htmlFetcher = require('../workers/htmlfetcher.js');

// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', 200);
    } else {
      httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + req.url, 200);
    }
  },

  'POST': function(req, res) {
    httpHelpers.collectData(req, function (data) {
      var url = data.slice(4);
      archive.isUrlInList(url, function(exists) {
        if (exists) {
          if (archive.isUrlArchived(url, function(exists) {
            if (exists) {
              httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 200);
            } else {
              httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 200);
            }
          })) {
          }
        } else {
          archive.addUrlToList(url, function () {
            console.log(url, 'not in list, adding', url, 'to list');
          });
          httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302);
        }
      });
    });
  },

};

exports.handleRequest = httpHelpers.makeActionHandler(actions);