'use strict'

//Require .env file
require('dotenv').config()

//Require other files that hold functions/function managing files
const commandManager = require('./services/commandManager')

//Defines the constants expressed in .env file
const token = process.env.TOKEN
const env = process.env.ENVIRONMENT
const ownerid = process.env.OWNERID

//Defines the prefix used for all commands.
// ? '+' : '='  means that if env === 'live' then const prefix is set to '+' otherwise '='
const prefix = env === 'live' ? '+' : '='

// ---- COMMANDS BEGIN HERE ---- //

console.log(commandManager.finalOutput(1,2,3))

//Debug line for checking the defined constants from the the .env file
console.log('---\nPrefix: ' + prefix + '\nToken: ' + token + '\nOwnerID: ' + ownerid + '\n---')