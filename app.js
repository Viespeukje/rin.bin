'use strict'

//Require .env file
require('dotenv').config()

//Require files that hold functions/function managing files
const
    Discord = require("discord.js"), // Discord.js library
    launchConsole = require('./services/commands/launchConsole'), //Startup Debug Functions
    webserver = require('./services/webserver')//Heroku webserver launch code

// This is the client. This is what is referred to with 'client.something' or 'bot.something' but it could be anything.
const client = new Discord.Client();

//Defines the constants expressed in .env file
const token = process.env.TOKEN
const env = process.env.ENVIRONMENT
const ownerid = process.env.OWNERID

//Defines the prefix used for all commands.
const prefix = env === 'live' ? '+' : '=' // ? '+' : '='  means that if env === 'live' then const prefix is set to '+' otherwise '='

// ---- LISTENER COMMANDS BEGIN HERE ---- //

// This event triggers when the bot starts up.
client.on("ready", () => {
    launchConsole.discord(client);
});

//This event triggers when the bot joins a guild.
client.on("guildCreate", guild => {
    console.log(`I have joined: ${guild.name} (id: ${guild.id}).\n---`);
});

//This event triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id}).\n---`);
});






// ---- GENERAL COMMANDS BEGIN HERE ---- //

//Debug line to check if the code is running at all
launchConsole.general(prefix, env);

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