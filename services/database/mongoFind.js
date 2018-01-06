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

const voteInfo = async function(reaction) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('vote');

    let messID = reaction.message.id; 

    // Get first two documents that match the query
    const docs = await col.find({'messageid': messID}).next();
    if(!docs) return false;

    console.log(docs);
    return docs;
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
};

module.exports = {
    voteInfo: voteInfo
}