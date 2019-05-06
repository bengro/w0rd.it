const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const express = require('express');

const lookup = require('./lookup.js');
const extractHash = require('./extractHash.js');
const reserveHash = require('./reserveHash.js');

const app = express();
app.use(express.bodyParser());

admin.initializeApp(functions.config().firebase);

app.get('/*', (request, response) => {
  const hash = extractHash(request.url);
  console.log('Looking up hash:', hash);

  lookup(hash)
    .then((hashData) => {
      if (hashData.url) {
        console.log(`Found hash ${hashData.hash} redirecting to ${hashData.url}`);
        response.redirect(hashData.url);
        return hashData;
      }

      throw Error(`Hash ${hashData.hash} does not have URL assigned to it`);
    })
    .catch(error => {
      console.log('Could not find hash', hash);
      response.sendFile(path.join(__dirname, '/views/404.html'));
      return;
    });
});

app.post('/shorten', (request, response) => {
  const url = request.body.url;
  const token = request.body.token;

  console.log(`Request to shorten URL ${url}`);

  return reserveHash(url)
  .then(hash => {
    return hash;
  });
});

exports.app = functions.https.onRequest(app);
