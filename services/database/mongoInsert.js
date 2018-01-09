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


const warningLog = async function (memid) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("---\nMongoInsert: Connected correctly to server...");

    console.log(memid)

    const db = client.db(dbName);
        // Get the collection
    const col = db.collection('warnings');
    const docs = await col.find({memberid:memid}).next();
    if (docs != null){
      console.log(`Found user with existing warnings.`)
      let warnings =  docs.warnCount+1;

      await col.findOneAndUpdate({memberid : memid}, {$set: {warnCount: warnings}});   
      console.log(`MongoInsert: warning for ${memid} with ${warnings} warnings correctly inserted...`);
      return warnings;
    }

    else{
      console.log(`Found user with no existing warnings.`)
      await col.insertOne({memberid : memid, warnCount : 1});
      let warnings = 1;
      console.log(`MongoInsert: warning for ${memid} with 1 warnings correctly inserted...`);
      return warnings;
    }
  } 
  catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
  console.log("MongoInsert: Disconnected correctly from server...\n---");
};


module.exports = {
    guideMute: guideMute,
    warningLog: warningLog
}