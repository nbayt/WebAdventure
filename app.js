var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var firebase = require("firebase");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/testupdate',function(req,res){
  //this was easy since req.body returns a JSON object
  var test_data=JSON.parse(req.body.key);
  console.log(test_data);
  firebase.database().ref(`/`).set(test_data);
  return res.redirect('/testfirebase');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

var config = {
  apiKey: "AIzaSyApD4FfZNCnk8rJ9DUtyfhGdm-Wj6z7Pq4",
  authDomain: "webadventure-7e07a.firebaseapp.com",
  databaseURL: "https://webadventure-7e07a.firebaseio.com",
  projectId: "webadventure-7e07a",
  storageBucket: "gs://webadventure-7e07a.appspot.com",
};
firebase.initializeApp(config);
