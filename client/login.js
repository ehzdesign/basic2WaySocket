
//store username and profile Image

var user = {};


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.

  user.name = profile.getName();
  console.log('Name: ' + profile.getName());

  user.image = profile.getImageUrl();
  console.log('Image URL: ' + profile.getImageUrl());

  // console.log('Email: ' + profile.getEmail());
}


// sign out a user
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  user = {};
}
