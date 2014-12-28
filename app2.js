var fs = require('fs');
var path = require('path');
var http2 = require('http2');

// We cache one file to be able to do simple performance tests without waiting for the disk


function onRequestLatency(request, response){
  setTimeout(function(){
    onRequest(request, response);
  },100);
}

// The callback to handle requests
function onRequest(request, response) {
  var filename = path.join(__dirname, 'public', request.url);

  // Reading file from disk if it exists and is safe.
  if ((filename.indexOf(__dirname) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    response.writeHead('200');

    // If they download the certificate, push the private key too, they might need it.
    if (response.push && request.url === '/localhost.crt') {
      var push = response.push('/localhost.key');
      push.writeHead(200);
      fs.createReadStream(path.join(__dirname, '/localhost.key')).pipe(push);
    }

    fs.createReadStream(filename).pipe(response);
  }

  // Otherwise responding with 404.
  else {
    response.writeHead('404');
    response.end();
  }
}

// Creating a bunyan logger (optional)
var log = require('http2/test/util').createLogger('server');

// Creating the server in plain or TLS mode (TLS mode is the default)
var server;
if (process.env.HTTP2_PLAIN) {
  server = http2.raw.createServer({
    log: log
  }, onRequest);
} else {
  server = http2.createServer({
    log: log,
    key: fs.readFileSync(path.join(__dirname, '/localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, '/localhost.crt'))
  }, onRequestLatency);
}

module.exports = server;