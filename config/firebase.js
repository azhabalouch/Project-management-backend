const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('../serviceAccountKey.js');

initializeApp({
  credential: cert(serviceAccount)
});