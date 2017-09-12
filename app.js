var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var firebase = require("firebase");

var firebaseHelper = require('./firebase_helper');

var index = require('./routes/index');
var login = require('./routes/auth/login');
var register = require('./routes/auth/register');
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

// might be useful
//app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
//  next();
//});

app.use('/', index);
app.use('/users', users);

app.use('/login', login);
app.use('/register', register);

//Create a new user
app.post('/createuser', function(req, res) {
  var UserName = req.body['name'];
  var UserEmail = req.body['email'];
	var UserPass = req.body['password'];
	firebaseHelper.addUser(UserName, UserEmail, UserPass,
		function(error, uid) {
			if (error) {
				return res.status(500).send(error);
			} else {
				// return res.status(201).send({uid : uid});
        return res.redirect('/');
		}
	});
});

app.post('/createplayer', function(req, res) {
  var player_data = req.body['player_data'];
  player_data = JSON.parse(decodeURI(player_data));
  console.log(player_data);
	firebase.database().ref(`/users/${firebaseHelper.firebase.auth().currentUser.uid}/player_info/player`).set(player_data);
  return res.redirect('/');
});

//Login the user
app.post('/userlogin', function(req, res) {
  var UserEmail = req.body['email'];
	var UserPass = req.body['password'];
	firebaseHelper.authenticate(UserEmail, UserPass,
		function(error, uid) {
			if (error) {
        console.log(error);
				return res.status(500).send(error);
			} else {
        return res.redirect('/');
		}
	});
});

//Login the user
app.post('/userlogout', function(req, res) {
	firebaseHelper.signOut(
		function(error, uid) {
			if (error) {
				return res.status(500).send(error);
			} else {
				// return res.status(201).send({uid : uid});
        return res.redirect('/login');
		}
	});
});

app.post('/testupdate',function(req,res){
  //this was easy since req.body returns a JSON object
  var test_data=JSON.parse(req.body.key);
  console.log(test_data);
  firebase.database().ref(`/users/${firebaseHelper.firebase.auth().currentUser.uid}/temp/`).set(test_data);
  return res.redirect('/');
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
