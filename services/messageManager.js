'use strict'

const 
    userHelp = require('./commands/userHelp'),
    userGems = require('./commands/userGems'),
    userWarn = require('./commands/userWarn')

module.exports = (client, message, prefix, env) => {
   
    if(message.author.bot) return; //Any bot inputs below this line will be ignored.
        
    if(message.content
        .indexOf(prefix) !== 0) return; //Any inputs below this line that do not begin with the prefix will be ignored

    const args = message.content     // This set of commands breaks up the message into a collection "args"
        .slice(prefix.length)     // Slice takes the message content and cuts off the arguments corresponding to the length of the config.prefix
        .trim()    // Trim cleans up any and all spaces
        .split(/ +/g);    // Split makes an array out of the string.

    const command = args // This set of commands defines command from args
        .shift()    // Shift removes the first element from an array to be processed
        .toLowerCase();    // toLowerCase() changes it to lower case


    // ---- GENERAL COMMANDS BEGIN HERE ---- //

    if(command === "help") {
        userHelp(client, message, prefix);
    }
    if(command === "gems") {
        userGems(client, message);
    }
    if(command === "warn") {
        userWarn(client, message);
    }





    //Debug line to output all of the raw commands the bot takes in.
   //console.log(`Environment: ${env}\nAuthor: ${message.author.username} (${message.author})\nMessage: ${message}\nCommand: ${command}\nArguments: ${args}\n---`);

}