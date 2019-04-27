const functions = require('firebase-functions');

exports.shortenUrl = functions.https.onRequest((request, response) => {
  response.send("Shorten URL");
  console.log(request);
});

exports.lookUpHash = functions.https.onRequest((request, response) => {
  response.send("Look up hash");

  functions.database.ref('/dictionary')
    .on('value', function(snapshot) {
      snapshot.forEach(function(item) {
        var childData = item.val();
        if (item === 'admittedly') {
          response.send("Found it!");
        } else {
          response.send("Cool")
        }
      });
    });

  console.log(request);
});

exports.countAvailableWords = functions.database.ref(`/dictionary`).onWrite((change, context) => {
  const data = change.after.val();
  const count = Object.keys(data).length;
  return change.after.ref.child('_count').set(count);
});

