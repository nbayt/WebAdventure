var express = require('express');
var firebase = require('firebase');
var router = express.Router();


async function getTestData() {
  var temp;
  await firebase.database().ref(`/`)
  .once('value')
  .then((snapshot) => {
    temp = snapshot.val()
  })
  return temp;
}

async function getProfileNode() {
  var dataObject = {}
  let [testData] = await Promise.all([getTestData()]);
  dataObject.testData = testData;
  console.log(dataObject.testData);
  return dataObject;
}

/* GET users listing. */
router.get('/testfirebase', function(req, res, next) {
  if (true) {
    // console.log(`profileURL is ${getProfileURL().then(console.log)}`);
    // var profileURL;s
    getProfileNode().then(profileNode => {
      res.render('index', {
        title: 'Dashboard - Profile',
        dataObject: encodeURI(JSON.stringify(profileNode.testData)),
        javascript: ['test.js']
      });

    })
  } else {
    res.redirect('/');
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', javascript: ['test.js']});
});

module.exports = router;
