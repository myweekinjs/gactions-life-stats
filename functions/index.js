'use strict';

const { actionssdk } = require('actions-on-google');
const functions = require('firebase-functions');

const app = actionssdk({
  debug: true
});

app.intent('actions.intent.MAIN', (conv) => {
  conv.ask('Hi!');
});

// More intent handling if needed
exports.lifeStyleFullfillment = functions.https.onRequest(app);