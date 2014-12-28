var fs = require('fs');
var path = require('path');
var http2 = require('http2');
var express = require('express');
var logger = require('morgan');
var bunyan = require('bunyan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var options = {
  log: bunyan.createLogger({
    name: 'dev',
    stream: process.stdout,
    serializers: http2.serializers,
    level: 'info'
  }),
  key: fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.crt')
};

//simulate latency
//app.use(function(req, res, next){
//    setTimeout(next, 100);
//});

//app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('404');
});

var server = http2.createServer(options, app);

module.exports = server;

/*
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

module.exports = server;*/