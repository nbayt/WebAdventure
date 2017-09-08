var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('auth/login', { title: 'Web Adventure - Login'});
});


module.exports = router;
