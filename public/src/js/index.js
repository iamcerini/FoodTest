/*
    Created by Andrea Cerini
    Date: 2/17/2017
*/
$(document).ready(function() {
    $("#button-log-in").on("click", googleSignin);
    $("#button-log-out").on("click", googleSignout);
});

// Intiliaise firebase
var config = {
    apiKey: "AIzaSyCr2fXhrJH4dnHHE9NEpwaXHIO2gPZNmmU",
    authDomain: "test-81b6a.firebaseapp.com",
    databaseURL: "https://test-81b6a.firebaseio.com",
    storageBucket: "test-81b6a.appspot.com",
    messagingSenderId: "279299443955"
};
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

// Function Log In
function googleSignin() {
    firebase.auth()
        .signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token)
            console.log(user)
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
} // login

// Function Log Out
function googleSignout() {
    firebase.auth().signOut()

    .then(function() {
        console.log('Signout Succesfull')
    }, function(error) {
        console.log('Signout Failed')
    });
} // logout

// On Log In Change
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        var $input = $(' <button id="button-log-out" onclick="googleSignout()">Google Logout</button>');
        $input.appendTo($("body"));
    } else {
        console.log('not logged in');
        $("#button-log-out").remove();
    }
}); // state change
