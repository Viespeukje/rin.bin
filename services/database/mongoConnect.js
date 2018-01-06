'use strict'

//Require .env file for hidden data.
require('dotenv').config()

//Require function files
const
  MongoClient = require('mongodb').MongoClient

//Define constants used for connection
const 
  url = process.env.MONGODB_URI


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {

  //Confirm that it is connected
  console.log('\x1b[34m%s\x1b[0m', "Connected successfully to MongoDB.\n---");

  client.close();
});