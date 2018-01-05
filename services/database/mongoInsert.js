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



const guideMute = function (messid, memid) {

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName); //Define the database to access
  const collection = db.collection('votes');   //Get the collection 'votes' in database dbName
  //Test to insert
  collection.insertOne({messageid : messid, memberid : memid, toPass : 3, toFail : 2, voteType : "guideMute"});
  console.log("Successfully inserted a guidemute vote record.");
  client.close();
});

}


module.exports = {
    guideMute: guideMute
}