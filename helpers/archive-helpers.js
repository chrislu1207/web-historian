var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var Promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    if (err) { console.log('not available'); }
    var urls = data.toString().split('\n');
    cb(urls);
  });
};

exports.isUrlInList = function(url, cb) {
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    if (err) { console.log('not available'); }
    var urls = data.toString().split('\n');
    if (urls.indexOf(url) > -1) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

exports.addUrlToList = function(url, cb) {
  if (!this.isUrlInList(url + '\n', function (exist) {
    return exist;
  })) {
    fs.appendFile(this.paths.list, url + '\n', function(err) {
      if (err) { console.log('not available'); }
      cb();
    });
  }
};

exports.isUrlArchived = function(url, cb) {
  fs.readdir(this.paths.archivedSites, function(err, files) {
    if (files.indexOf(url) > -1) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    fs.writeFile(this.paths.archivedSites + '/' + urls[i], '', function(err) {
      if (err) { console.log('not available'); }
    });
  }
};






















