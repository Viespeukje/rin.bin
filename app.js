'use strict'

//Require .env file
//TEMP CHANGES
//require('dotenv').config()

//Require files that hold functions/function managing files
const
    Discord = require("discord.js"), // Discord.js library
    commandManager = require('./services/commandManager'), //Run commandManager Functions
    voteManager = require('./services/voteManager'), //Evaluate and run votes
    startupDebug = require('./services/tools/startupDebug'),
    guildChange = require('./services/tools/guildChange') //Startup Debug Functions
    //CPTN TODO possibly delete this checkRoles = require('./services/tools/checkRoles'),
    //reactRoles = require('./services/tools/reactRoles'), // WIP THIS CODE IS INACTIVE.
    //TEMP CHANGE webserver = require('./services/webserver'),//Heroku webserver launch code
    //TEMP CHANGE mongoConnect = require('./services/database/mongoConnect'),//MongoDB database
    //TEMP CHANGE mongoFind = require('./services/database/mongoFind')//Pull from a database

// This is the client. This is what is referred to with 'client.something' or 'bot.something' but it could be anything.
const client = new Discord.Client();

//Defines the constants expressed in .env file
//TEMP CHANGES
const 
    token = "NDk5NzA0NzY2NDk5MTI3MzA3.DqAK7A.-J6nGiM69I7tXKwJf2iHetkLtIs", //process.env.TOKEN,
    env = "live", //process.env.ENVIRONMENT,
    ownerid = "138760688741908481" //process.env.OWNERID

//Defines the prefix used for all commands.
const prefix = env === 'live' ? '+' : '=' // ? '+' : '='  means that if env === 'live' then const prefix is set to '+' otherwise '='

// ---- LISTENER COMMANDS BEGIN HERE ---- //

//Assuming it logs in to discord using provided token (defined in .env) when this is launched.
client.login(token);

// This event triggers when the bot starts up.
client.on("ready", () => {
    startupDebug.discord(client);

    //Initialize the command manager
    commandManager.init();
    //Run webserver
    //TEMP CHANGE webserver();

    client.user.setGame(`with her fluffy tail`);
});

// client.on("messageDelete", (messageDelete) => {
//     messageDelete.channel.send(messageDelete.content.split(" ").length)
// });

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
    commandManager.onMessage(client, message, prefix, env);
});

client.on('guildMemberAdd', member => {
    //This is a line of code that duplicates pandobot's welcome message.
    //member.guild.channels.get('279584314856046592').send(`Welcome to the Kinkdom, ${member}! To get started, please read the <#279597756887203840> and submit an introduction by following the instructions in <#280313739235033088>. Once approved by a staff member, you'll be able to access more channels. If you have any questions on how to get started, please feel free to ask in main chat or DM one of our Operators in the member list!`); 
});

//This event triggers when a reaction is added
client.on("messageReactionAdd", async (reaction, user) => {
    
    //If the message being reacted to was not posted by Rin.bin, ignore it.
    if (!reaction.message.author.username == "Rin.bin") return; 
    if (reaction.message.content == "React to this message with 👍 to assign a role and 👎 to remove the role."){
        if(reaction.emoji.name == "👍") reaction.message.channel.send("Assigning a role...");
        else if(reaction.emoji.name == "👎") reaction.message.channel.send("Removing a role...");
        else return;
    };

    //Check if the client needs to add a role to a user.
    // WIP THIS CODE IS INACTIVE.
    // reactRoles(reaction);

    //Fetch a constant that contains the database information for the message being reacted to.
    const voteInfo = await mongoFind.voteInfo(reaction);
    //If the database info does not exist, reject it entirely.
    if(!voteInfo) return;
    //Output Test
    console.log(voteInfo)
    voteManager(client, reaction, voteInfo, env)
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