var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('auth/login', { title: 'Web Adventure - Login', javascript: ['login.js', 'storage_helper.js']});
});


module.exports = router;
