var express = require('express');
var firebase = require('firebase');
var firebaseHelper = require('../firebase_helper');
var router = express.Router();


async function getPlayerData() {
  var temp;
  await firebase.database().ref(`/users/${firebaseHelper.firebase.auth().currentUser.uid}/player_info/player`)
  .once('value')
  .then((snapshot) => {
    temp = snapshot.val()
  })
  return temp;
}

async function getProfileNode() {
  var dataObject = {}
  let [playerData] = await Promise.all([getPlayerData()]);
  dataObject.playerData = playerData;
  console.log("got data: ");
  console.log(dataObject.playerData);
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
        playerData: encodeURI(JSON.stringify(profileNode.playerData)),
        javascript: ['player.js','enemy.js','main.js','storage_helper.js']
      });

    })
  } else {
    res.redirect('/');
  }

});

router.get('/createplayer', function(req, res, next) {
  if(firebaseHelper.firebase.auth().currentUser != null){
    getProfileNode().then(profileNode => {
      res.render('player/create_player', {
        title: 'Create Hero',
        dataObject: encodeURI(JSON.stringify(profileNode.playerData)),
        javascript: ['player.js','create_player.js']
      });
    })
  } else {
    res.redirect('/login');
  }
});

router.get('/battle',function(req, res,next){
  if(firebaseHelper.firebase.auth().currentUser != null){
    res.render('battle.hbs',{
      title: 'Battle',
      javascript: ['player.js','enemy.js','battle.js','gear.js','storage_helper.js']
    });
  } else {
    res.redirect('/login');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if(firebaseHelper.firebase.auth().currentUser != null){
    getProfileNode().then(profileNode => {
      res.render('index', {
        title: 'Index',
        playerData: encodeURI(JSON.stringify(profileNode.playerData)),
        javascript: ['index.js','player.js','storage_helper.js']
      });
    })
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
