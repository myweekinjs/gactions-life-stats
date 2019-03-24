'use strict'

// Import the required packages for this to work
const { dialogflow } = require('actions-on-google')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Config file generated through the Firebase admin interface
const serviceAccount = require("./life-stats-168c9-firebase-adminsdk-tiaoj-4c55fe4206.json")

// Initialise the app with the config file
// databaseURL should probably be in a .env file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://life-stats-168c9.firebaseio.com"
})

// create a dialogflow app
const app = dialogflow({
  debug: true
})

// For the Add Coffee intent
// The coffee variable is passed from DialogFlow far giving the intent several Training Phrases
app.intent('Add Coffee', (conv, { coffees }) => {
  // Print out a request while the DB is being updated
  conv.ask(`Processing your request...`)
  
  // Push the coffee count + a timestamp into the DB
  return admin.database().ref('/coffee').push({
    coffee: parseInt(coffees), // the coffee variable is a string by default
    timestamp: admin.database.ServerValue.TIMESTAMP // used to organise when coffees were consumed
  })
  // Print out a success message
  .then((snapshot) => conv.close(`We've added ${coffees} coffees`))
  // Print out a fail message
  .catch((e) => conv.ask(`Something went wrong. Try adding your coffees again`))
})

// Export the Cloud Function with a name
exports.lifeStyleFullfillment = functions.https.onRequest(app)
