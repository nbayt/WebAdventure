const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyApD4FfZNCnk8rJ9DUtyfhGdm-Wj6z7Pq4",
  authDomain: "webadventure-7e07a.firebaseapp.com",
  databaseURL: "https://webadventure-7e07a.firebaseio.com",
  projectId: "webadventure-7e07a",
  storageBucket: "gs://webadventure-7e07a.appspot.com",
};
firebase.initializeApp(config);

const auth = firebase.auth();


// Takes UserID, Name and email
// Returns nothing
// Uploads some basic data to the user account database ref
function writeUserData(userID, name, email) {
  console.log("updating a new user profile")
  firebase.database().ref('users/' + userID).set({
    fullname: name,
    email: email,
  });
  firebase.database().ref(`users/${userID}/player_info`).set({
    "player": {
      "name" : "null"
    }
  });
}

function createUser(name, email, password, callback) {
  auth.createUserWithEmailAndPassword(email, password).then(function(success) {
    writeUserData(auth.currentUser.uid, name, email)
    callback(success.code)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    callback(error);
  });
}

function signInUser(email, password, callback) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(success) {
    callback(success.code);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    callback(error);
  });
}

function signOutUser(callback) {
  firebase.auth().signOut().then(function(success) { 
    // Sign-out successful.
    callback(success);
  }).catch(function(error) {
    // An error happened.
    callback(error); 
  });
}

function updateAccountSettings(fullName, email,  callback) {
  firebase.database().ref('users/' + auth.currentUser.uid + '/account_settings').set({
    phoneNumber: fullName,
    email: email
  }).then(success => {
    callback(success)
  }).catch(error => {
    callback(error)
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // console.log('user is signed in');
    // Can do something here.
  } else {
    // console.log('user is not signed in');
  }
});


module.exports = {
  firebase: firebase,
  addUser: createUser,
  authenticate: signInUser,
  signOut: signOutUser,
  updateAccount: updateAccountSettings
}
