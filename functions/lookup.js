const admin = require('firebase-admin');

const collectionName = 'words';

module.exports = function(hash) {
  return admin
    .firestore()
    .collection(collectionName)
    .doc(hash)
    .get()
    .then(doc => {
      if (!doc.exists) {
        throw Error(`Hash does not exist for ${hash}`);
      }
      return doc.data();
    });
};
