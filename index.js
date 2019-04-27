const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.countAvailableWords = functions.database.ref(`/dictionary`).onWrite((change, context) => {
    const data = change.after.val();
    const count = Object.keys(data).length;
    return change.after.ref.child('_count').set(count);
});
