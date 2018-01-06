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

    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('vote');

    // Get first doc that has the same messageid as reaction.message.id
    const docs = await col.find({'messageid': reaction.message.id}).next();

    //If the doc is not found, return false to be rejected.
    if(!docs) return false;

    //If the doc is  found, return it.
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