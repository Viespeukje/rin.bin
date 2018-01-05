'use strict'

//Require .env file for hidden data.
require('dotenv').config()

//Require function files
const
  MongoClient = require('mongodb').MongoClient

//Define constants used for connection
const 
  url = process.env.MONGODB_URI,
  dbName = 'heroku_sn3pdxkb' //Will not be hardcoded in the future



// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {

  //Confirm that it is connected
  console.log("Connected successfully to MongoDB");

  //Define the database to access
  const db = client.db(dbName);

  //Get the collection 'test' in database dbName
  const collection = db.collection('test');

  //Test to insert some documents
  collection.insertMany([
    {testvalue : 1}, {testvalue : 2}, {testvalue : 3}
  ]);
  console.log("Successfully inserted 3 files");
  
  //Test to get contents of file
  collection.find({}).forEach(function(docs) {
    console.log(docs.testvalue);
  });

  client.close();
});