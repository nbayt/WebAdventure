var express = require('express');
var firebase = require('firebase');
var firebaseHelper = require('../firebase_helper');
var router = express.Router();


async function getTestData() {
  var temp;
  await firebase.database().ref(`/users/${firebaseHelper.firebase.auth().currentUser.uid}/temp/`)
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
router.get('/player', function(req, res, next) {
  if (firebaseHelper.firebase.auth().currentUser != null) {
    // console.log(`profileURL is ${getProfileURL().then(console.log)}`);
    // var profileURL;s
    getProfileNode().then(profileNode => {
      res.render('player', {
        title: 'Web Adventure - Player',
        dataObject: encodeURI(JSON.stringify(profileNode.testData)),
        javascript: ['player.js','enemy.js','main.js','storage_helper.js']
      });

    })
  } else {
    res.redirect('/');
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  if(firebaseHelper.firebase.auth().currentUser != null){
    getProfileNode().then(profileNode => {
      res.render('index', {
        title: 'Express',
        dataObject: encodeURI(JSON.stringify(profileNode.testData)),
        javascript: ['test.js']
      });
    })
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
