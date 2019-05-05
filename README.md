# A word-based URL shortener

Instead of a random hash, you get a memorable word. Try it out it at [w0rd.it](https://w0rd.it). 

[WordNet](https://wordnet.princeton.edu/download/current-version) is a great word dictionary and serves words and explanations.

## Development 

The backend is deployed on Google Firebase, the frontend is written in ancient Angular 1.4.

## Deployment
To deploy everything run:
```
./deploy
```

To deploy cloud functions, run:
```
node_modules/firebase-tools/lib/bin/firebase.js deploy --only functions
```
