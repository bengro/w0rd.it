const admin = require('firebase-admin');

const collectionName = 'words';

module.exports = function reserveHash(url) {
  if (!url) {
    return new Promise((resolve, reject) => {
      reject(Error('Request invalid: please specify URL'))
    });
  }

  return admin
    .firestore()
    .collection(collectionName)
    .where('available', '==', '1')
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        throw Error(`Could not find an available hash :(`);
      }
      let entry = snapshot.docs[0].data();
      const hash = entry.hash;
      console.log(`Found hash ${hash} for ${url}`);
      return entry;
    })
    .then(entry => {
      console.log(`Reserve hash ${entry.hash}... `);
      return admin
        .firestore()
        .collection(collectionName)
        .doc(entry.hash)
        .update({
          available: '0',
          url: url,
          registered: new Date().toISOString()
        })
        .then(() => entry)
    })
    .catch(error => {
      console.error(error);
    });
};
