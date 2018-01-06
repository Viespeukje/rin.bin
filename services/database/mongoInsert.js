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

const guideMute = async function (messid, memid) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("---\nMongoInsert: Connected correctly to server...");

    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('vote');

    // Insert a single document
    await col.insertOne({messageid : messid, memberid : memid, toPass : 3, toFail : 2, voteType : "guideMute"});
    console.log(`MongoInsert: guideMute for ${messid} correctly inserted...`);
  } 
  catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
  console.log("MongoInsert: Disconnected correctly from server...\n---");
};


module.exports = {
    guideMute: guideMute
}