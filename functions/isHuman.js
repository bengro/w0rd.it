const rp = require('request-promise');
const functions = require('firebase-functions');

module.exports = async function isHuman(token) {
  return rp({
    uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
    method: 'POST',
    formData: {
      secret: functions.config().app.recaptcha_secret,
      response: token
    },
    json: true
  }).then(result => {
    console.log('Recaptcha Result:', result);
    return result.success;
  }).catch(reason => {
    console.log("Recaptcha request failure", reason)
  })
};