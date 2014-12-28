var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');

var app = express();

var options = {
  key: fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.crt')
};

//simulate latency
//app.use(function(req, res, next){
//    setTimeout(next, 100);
//});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('404');
});

var server = https.createServer(options, app);

module.exports = server;
