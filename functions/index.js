const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const url = require('url');

const express = require('express');
const app = express();

admin.initializeApp(functions.config().firebase);

const host = 'https://w0rd-it.firebaseapp.com/';

app.get('/*', (request, response) => {
  const url_parts = url.parse(request.url);
  let hash = url_parts.pathname.replace('/', '');
  console.log('Looking up hash:', hash);

  admin
    .firestore()
    .collection('words')
    .doc(hash)
    .get()
    .then(doc => {
      if (!doc.exists) {
        throw Error('Hash does not exist for', hash);
      }

      const hashData = doc.data();

      if (hashData.url) {
        console.log(`Found hash ${hashData.hash} redirecting to ${hashData.url}`);
        response.redirect(hashData.url);
        return hashData;
      }

      throw Error(`Hash ${hashData.hash} does not have URL assigned to it`);
    })
    .catch(error => {
      response.sendFile(path.join(__dirname, '/views/404.html'));
      return;
    })
});

exports.app = functions.https.onRequest(app);
