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

const voteID = function (reaction) {

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName); //Define the database to access
  const collection = db.collection('votes');   //Get the collection 'votes' in database dbName
  let messID = reaction.message.id;
  

const collectOutput = collection.find({'messageid': messID});


//console.log(collectOutput);
collection.find({'messageid': messID}).next((err, docs)=> {
  console.log("Found the following records");
  console.log(docs.messageid);
});

//console.log(`${collectOutput[messageid]} ${collectOutput[memberid]} ${collectOutput[toPass]} ${collectOutput[toFail]} ${collectOutput[voteType]}`)


// collection.find({'messageid': messID}).toArray(function(err, docs) {
//   console.log("Found the following records");
//   console.log(docs);
// });


  //console.log(collection.find({}).forEach(function(docs) {
    //if(docs.messageid === messID) console.log(`${docs.toPass} ${docs.toFail} ${docs.messageid} ${docs.memberid}`);
    //if(docs.messageid === messid) return `[${docs.toPass},${docs.toFail},${docs.messageid},${docs.memberid}]`
  //}));
// });
    client.close();


});
}

module.exports = {
    voteID: voteID
}