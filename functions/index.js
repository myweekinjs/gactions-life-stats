'use strict';

const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./life-stats-168c9-firebase-adminsdk-tiaoj-4c55fe4206.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://life-stats-168c9.firebaseio.com"
});

const app = dialogflow({
  debug: true
});

app.intent('Add Coffee', (conv, { coffees }) => {
  conv.ask(`Processing your request...`);
  return admin.database().ref('/coffee').push({ coffee: coffees })
    .then((snapshot) => {
      return conv.close(`We've added ${coffees} coffees`);
    })
    .catch((e) => {
      return conv.ask(`Something went wrong. Try adding your coffees again`)
    });
});

// More intent handling if needed
exports.lifeStyleFullfillment = functions.https.onRequest(app);
