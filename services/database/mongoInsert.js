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

const warningCount = async function (memid, count) {
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
      console.log(`Setting warnings for user with existing warnings.`)
      let warnings = count;
      await col.findOneAndUpdate({memberid : memid}, {$set: {warnCount: warnings}});   
      console.log(`MongoInsert: altered warning counter for ${memid}. Counter set to ${count}...`);
      return warnings;
    }

    else{
      console.log(`Setting warnings for user with no existing warnings.`)
      await col.insertOne({memberid : memid, warnCount : count});
      let warnings = count;
      console.log(`MongoInsert: altered warning counter for ${memid}. Counter set to ${count}...`);
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

const spamLog = async function (memid) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("---\nMongoInsert: Connected correctly to server...");

    console.log(memid)

    const db = client.db(dbName);
        // Get the collection
    const col = db.collection('spam');
    const docs = await col.find({memberid:memid}).next();
    if (docs != null){
      console.log(`Found user with existing spam counter.`)
      let spam =  docs.spamCount+1;

      await col.findOneAndUpdate({memberid : memid}, {$set: {spamCount: spam}});   
      console.log(`MongoInsert: spam for ${memid} with ${spam} spam correctly inserted...`);
      return spam;
    }

    else{
      console.log(`Found user with no existing spam.`)
      await col.insertOne({memberid : memid, spamCount : 1});
      let spam = 1;
      console.log(`MongoInsert: spam count for ${memid} with 1 spam correctly inserted...`);
      return spam;
    }
  } 
  catch (err) {
    console.log(`Something fucked up.`);
    //console.log(err.stack);
  }

  // Close connection
  client.close();
  console.log("MongoInsert: Disconnected correctly from server...\n---");
};

const spamClear = async function (memid) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("---\nMongoInsert: Connected correctly to server...");

    console.log(memid)

    const db = client.db(dbName);
        // Get the collection
    const col = db.collection('spam');
    const docs = await col.find({memberid:memid}).next();
    if (docs != null){
      console.log(`Found user with existing spam counter.`)
      let spam =  0;
      await col.findOneAndUpdate({memberid : memid}, {$set: {spamCount: spam}});   
      console.log(`Spamcounter Cleared.`);
    }
  } 
  catch (err) {
    console.log(`Something fucked up.`);
    //console.log(err.stack);
  }

  // Close connection
  client.close();
  console.log("MongoInsert: Disconnected correctly from server...\n---");
};

module.exports = {
    guideMute: guideMute,
    warningLog: warningLog,
    spamLog: spamLog,
    spamClear: spamClear,
    warningCount: warningCount
}