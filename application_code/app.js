var http = require('http');
var fs = require('fs');

// Node web server
var server = http.createServer(function(req, res) {
  console.log("request was made: " + req.url);
  // Home
  if (req.url === '/home' || req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    var message = 'Instrument Exchange'; // Basic template
    html = html.replace('{Message}', message);
    res.end(html);
  }
  // 404 routing
  else {
    res.writeHead(404, {'Content-type': 'text/html'});
    var html = fs.readFileSync(__dirname + '/404.html', 'utf8');
    res.end(html);
  }
});

server.listen(3000, '127.0.0.1');
console.log("Listening now. Port 3000.");
