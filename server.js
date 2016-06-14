var fs = require('fs')
var path = require('path')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express()

// SESSION
var sess = {
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 }
}
if(process.env.NODE_ENV === production){
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}
app.use(session(sess))

//PORT heroku
app.set('port', (process.env.PORT || 3000))

// Access the session as req.session
app.get('/', function(req, res, next) {
  var sid = req.session.id
  next()
})

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// API calls about user
var nerd_router = require('./nerd_router');
app.use('/nerd', nerd_router);

// API calls about games
var game_router = require('./game_router');
app.use('/game', game_router);

// API calls about stats
var stat_router = require('./stat_router');
app.use('/stat', stat_router);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
