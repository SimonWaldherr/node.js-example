/*jslint devel: true, node: true, indent: 2 */

var http = require('http'),
  urire = require('./modules/urire/urire.js'),
  path = require('path'),
  fs = require('fs'),
  port = process.env.PORT || 8080;

http.createServer(function (request, response) {
  'use strict';
  var uri = urire.parse(request.url),
    filename = 'htdocs' + uri.path;

  console.log(filename);

  fs.exists(filename, function (exists) {
    if (!exists) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    /*jslint stupid: true */
    if (fs.lstatSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, 'binary', function (err, file) {
      if (err) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(err + '\n');
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, 'binary');
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log('Webserver listening on port ' + port);
