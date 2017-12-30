'use strict'

//Require .env file
require('dotenv').config()

//Require files that hold functions/function managing files
const
    Discord = require("discord.js"), // Discord.js library
    messageManager = require('./services/messageManager'), //Run messageManager Functions
    startupDebug = require('./services/commands/startupDebug'),
    guildChange = require('./services/commands/guildChange'), //Startup Debug Functions
    webserver = require('./services/webserver')//Heroku webserver launch code

// This is the client. This is what is referred to with 'client.something' or 'bot.something' but it could be anything.
const client = new Discord.Client();

//Defines the constants expressed in .env file
const 
    token = process.env.TOKEN,
    env = process.env.ENVIRONMENT,
    ownerid = process.env.OWNERID

//Defines the prefix used for all commands.
const prefix = env === 'live' ? '+' : '=' // ? '+' : '='  means that if env === 'live' then const prefix is set to '+' otherwise '='

// ---- LISTENER COMMANDS BEGIN HERE ---- //

// This event triggers when the bot starts up.
client.on("ready", () => {
    startupDebug.discord(client);
});

//This event triggers when the bot joins a guild.
client.on("guildCreate", guild => {
    guildChange.joined(guild);
});

//This event triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
    guildChange.removed(guild);
});

//This event triggers when the bot recieves a message
client.on("message", message => {
    messageManager(client, message, prefix, env);
});




// ---- GENERAL COMMANDS BEGIN HERE ---- //

//Debug line to check if the code is running at all
startupDebug.general(prefix, env);

//Run webserver
webserver();

//Assuming it logs in to discord using provided token (defined in .env) when this is launched.
client.login(token);

// Gracefully shutdown on CTRL + C
process.on('SIGINT', function () {
    console.log(`Shutting down node...`)
    process.exit(0)
})

//Unhandled Rejection
process.on('unhandledRejection', err => console.log(`Uncaught Promise Error: \n${err.stack}`))