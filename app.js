'use strict'

//Require .env file
require('dotenv').config()

//Require files that hold functions/function managing files
const Discord = require("discord.js"); // Discord.js library
const launchDebug = require('./services/commands/launchDebug') //Startup Debug Functions
const webserver = require('./services/webserver')

// This is the client. This is what is referred to with 'client.something' or 'bot.something' but it could be anything.
const client = new Discord.Client();

//Defines the constants expressed in .env file
const token = process.env.TOKEN
const env = process.env.ENVIRONMENT
const ownerid = process.env.OWNERID

//Defines the prefix used for all commands.
const prefix = env === 'live' ? '+' : '=' // ? '+' : '='  means that if env === 'live' then const prefix is set to '+' otherwise '='

// ---- LISTENER COMMANDS BEGIN HERE ---- //

//Debug line that activates when the bot starts up.
client.on("ready", () => {
    launchDebug.discord();
});

// ---- GENERAL COMMANDS BEGIN HERE ---- //

//Debug line to check if the code is running at all
launchDebug.general(prefix, env, token);

//Assuming it logs in to discord using provided token (defined in .env) when this is launched.
client.login(token);

//Unhandled Rejection
process.on('unhandledRejection', err => console.log(`Uncaught Promise Error: \n${err.stack}`))

// Gracefully shutdown on CTRL + C
process.on('SIGINT', function () {
    console.log(`Shutting down node...`)
    process.exit(0)
})