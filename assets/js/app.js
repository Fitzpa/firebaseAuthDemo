// Initialize Firebase
var config = {
  apiKey: "AIzaSyCMJ01rD9Ucqh2KEUE79yEpPMNvanTFGZg",
  authDomain: "louiefirstproject.firebaseapp.com",
  databaseURL: "https://louiefirstproject.firebaseio.com",
  projectId: "louiefirstproject",
  storageBucket: "louiefirstproject.appspot.com",
  messagingSenderId: "940218817270"
};
firebase.initializeApp(config);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var globalUser;
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log(authResult);
     

      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "main.html",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


/// talking to firebase to read and write information
var database = firebase.database();





$(document).on('click', '#newsButton', function(event) { 
    event.preventDefault();
    var newsPrefRef = database.ref("/newsPreferences/" + globalUser.uid );
    var choice = $(this).attr('data-val');
    newsPrefRef.push(choice);
    console.log('You clicked a button' + choice);


})

firebase.auth().onAuthStateChanged(function(user) {
   
    if (user) {
     globalUser = user;
     console.log(globalUser.displayName);
     $("#userLoginDiv").text("The User is " + globalUser.displayName);
    }
  });
