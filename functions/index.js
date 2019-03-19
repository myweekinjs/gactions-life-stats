'use strict';

const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({
  debug: true
});

app.intent('Add Coffee', (conv, { coffees }) => {
  conv.close(`We are adding ${coffees}. See you next time!`)
})

// More intent handling if needed
exports.lifeStyleFullfillment = functions.https.onRequest(app);
