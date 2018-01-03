const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://ds237707.mlab.com:37707';

// Database Name
const dbName = 'heroku_sn3pdxkb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to MongoDB");

  const db = client.db(dbName);

  client.close();
});