var fs,
  express,
  app,
  port;

fs = require('fs');
express = require('express');
app = express.createServer(express.logger());
port = process.env.PORT || 8080;

app.use(function(request, response, next){
  var fileuri = request.url !== '/' ? request.url : '/index.html';
  fs.exists('./htdocs' + fileuri, function (found) {
    if (found) {
      response.send(fs.readFileSync('./htdocs' + fileuri).toString());
    } else {
      response.send(404, 'These aren\'t the files you\'re looking for');
    }
  });
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
