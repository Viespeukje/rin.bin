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
  
const create = async function (trophyData) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("---\nMongoInsert: Connected correctly to server...");

    const db = client.db(dbName);
    const col = db.collection('trophyList');

    console.log(`Successfully inserted: \n${trophyData}`)

    await col.insertOne({
      trophyName : trophyData[0],
      trophyID : trophyData[1],
      trophyRarity : trophyData[2],
      trophyReason : trophyData[3],
      trophyFlavor : trophyData[4], 
      trophyImage : trophyData[5],
      trophyCreator : trophyData[6],
      trophyDate : trophyData[7]
    })
  }

  catch (err) {
    console.log(`Something fucked up.`);
    //console.log(err.stack);
  }
  // Close connection
  client.close();
  console.log("MongoInsert: Disconnected correctly from server...\n---");
};

const about = async function(findID) {
  let client;

  try {
    client = await MongoClient.connect(url);

    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('trophyList');

    const docs = await col.find({'trophyID': findID}).next();

    //If the doc is not found, return false to be rejected.
    if(!docs) return false;

    console.log(docs);

    //If the doc is  found, return it.
    return docs;
  } 
  catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
};

const give = async function (membID, tropID) {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("---\nMongoInsert: Connected correctly to server...");

    console.log(membID);
    console.log(tropID);

    const db = client.db(dbName);
    const col = db.collection('trophyOwned');
    const docs = await col.find({memberID:membID}).next();

    console.log(docs);

    if (docs != null){
      console.log(`Found user with trophies recorded.`);
      let trophyIDUpdate =  docs.trophyID;
      trophyIDUpdate.push(tropID);
      console.log(`UPDATING with ${trophyIDUpdate}`)
      await col.findOneAndUpdate({memberID : membID}, {$set: {trophyID: trophyIDUpdate}});   
      console.log(`MongoInsert: Successfully updated trophies to ${trophyIDUpdate}...`);
      return true;
    }
    else{
      console.log(`Found user without trophies recorded.`);
      let trophyIDUpdate = [tropID];
      await col.insertOne({
        memberID : membID,
        trophyID : trophyIDUpdate
      })  
      console.log(`MongoInsert: Successfully added first trophy ${trophyIDUpdate}...`);
      return true;
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
    create: create,
    about: about,
    give: give
}