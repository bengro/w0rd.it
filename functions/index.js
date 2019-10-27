const functions = require('firebase-functions');

const admin = require('firebase-admin');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const lookup = require('./lookup.js');
const extractHash = require('./extractHash.js');
const reserveHash = require('./reserveHash.js');
const isHuman = require("./isHuman.js");

const firebase = functions.config().firebase;

const app = express();
app.use(bodyParser.json(), cors());

admin.initializeApp(firebase);

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
    .catch(() => {
      console.log('Could not find hash', hash);
      response.sendFile(path.join(__dirname, '/views/404.html'));
    });
});

app.post('/shorten', async (request, response) => {
  console.log('Received request to shorten URL with payload', request.body);

  const payload = request.body;
  const url = payload.url;
  const recaptchaToken = payload.recaptchaToken;

  const isAuthenticRequest = await isHuman(recaptchaToken);
  if (!isAuthenticRequest) {
    console.log('Rejecting request due to robot suspicion.');
    throw Error('I have a suspicion you are not human, sorry.')
  }

  console.log(`Request to shorten URL ${url}`);

  reserveHash(url)
    .then(entry => {
      const payload = {
        hash: entry.hash,
        description: entry.description,
        url: url
      };

      console.log('Returning reserved hash', payload);

      response.status(201).json(payload);

      return entry;
    })
    .catch(error => {
      console.error('Error shortening URL:', error);

      response
        .status(400)
        .json({error: error})
    });

  return response;
});

exports.app = functions.https.onRequest(app);
