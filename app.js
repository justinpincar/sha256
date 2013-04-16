var ejs = require('ejs');
var express = require('express');
var path = require('path');
var utils = require('./lib/utils');

var app = express();
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger({ format: 'dev' }));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('*', function(req, res) {
  var value = req.url.substr(1);

  if (value == "") {
    return res.redirect('/' + utils.randomString(Math.random, 64));
  }

  var hash = utils.hexSha256(value);
  return res.render('index', { value: value, hash: hash });
});

app.listen(app.get('port'));
console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') + " mode");

