const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");
const data = require("./dictionary.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://w0rd-it.firebaseio.com"
});

const words = data.words.map(item => {
  return {
    "hash": item.hash.trim(),
    "description": item.description.trim(),
    "available": item.available,
    "language": item.language,
    "registered": item.registered,
    "url": item.url
  }
});

console.log("Writing to Firestore...");

words.forEach(word => {
  admin.firestore()
    .collection("words")
    .doc(word.hash)
    .set(word)
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
})
