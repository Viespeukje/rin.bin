'use strict'

//Require .env file
require('dotenv').config()

//Require files that hold functions/function managing files
const
    Discord = require("discord.js"), // Discord.js library
    commandManager = require('./services/commandManager'), //Run commandManager Functions
    startupDebug = require('./services/tools/startupDebug'),
    guildChange = require('./services/tools/guildChange'), //Startup Debug Functions
    webserver = require('./services/webserver'),//Heroku webserver launch code
    mongoConnect = require('./services/database/mongoConnect'),//MongoDB database
    mongoFind = require('./services/database/mongoFind')//MongoDB database

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

//Assuming it logs in to discord using provided token (defined in .env) when this is launched.
client.login(token);

// This event triggers when the bot starts up.
client.on("ready", () => {
    startupDebug.discord(client);

    //Run webserver
    webserver();

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
    commandManager(client, message, prefix, env);
});

//This event triggers when a reaction is added
client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.author.username == "Rin.bin") console.log("TEST3 PASSED\n"+await mongoFind.voteID(reaction));
 });

 //This event triggers when a reaction is removed
 client.on("messageReactionRemove", (reaction, user) => {
     //
});
 

//Debug line to check if the code is running at all
startupDebug.general(prefix, env);



// ---- GENERAL COMMANDS BEGIN HERE ---- //

// Gracefully shutdown on CTRL + C
process.on('SIGINT', function () {
    console.log('\x1b[34m%s\x1b[0m', `Shutting down node...`)
    process.exit(0)
})

//Unhandled Rejection
process.on('unhandledRejection', err => console.log("\x1b[31m%s\x1b[0m", `Uncaught Promise Error: \n${err.stack}`))