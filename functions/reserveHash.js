const admin = require('firebase-admin');

const collectionName = 'words';

module.exports = function reserveHash(url) {
  return admin.collection(collectionName)
    .where('available', '==', '1')
    .limit(1)
    .get()
    .then(hash => {
      return hash.data();
    })
    .then(hash => {
      return admin.collection(collectionName).doc(hash).update({
        available: '0',
        url: url,
        registered: new Date().toISOString()
      });
    });
}
