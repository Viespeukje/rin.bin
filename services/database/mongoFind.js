'use strict'

//Require .env file for hidden data.
require('dotenv').config()

//Require function files
const
  MongoClient = require('mongodb').MongoClient

//Define constants used for connection
const 
  url = process.env.MONGODB_URI,
  dbName = process.env.MONGODB_DB //Will not be hardcoded in the future

const voteID = async function (reaction) {

// Use connect method to connect to the server
MongoClient.connect(url, async function(err, client) {
  const db = client.db(dbName); //Define the database to access
  const collection = db.collection('votes');   //Get the collection 'votes' in database dbName
  let messID = reaction.message.id; 
  const asyncvar = await collection.find({'messageid': messID}).next();
  console.log("TEST1 PASSED\n"+asyncvar.messageid)
  client.close();
  callback (test);
});
}

module.exports = {
    voteID: voteID
}