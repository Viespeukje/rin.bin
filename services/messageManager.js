'use strict'

//Require other files that hold functions/function managing files
// const addNumber = require('./commands/addNumber')
// const addOne = require('./commands/addOne')

module.exports = (message, prefix, env) => {
   
    // Ignore all messages sent by bots, including itself.
    if(message.author.bot) return;
        
    // Ignore anything that does not start with the config.prefix prefix.
    if(message.content.indexOf(prefix) !== 0) return;

    // This set of commands breaks up the message into a collection "args"
    // Slice takes the message content and cuts off the arguments corresponding to the length of the config.prefix
    // Trim cleans up any and all spaces
    // Split makes an array out of the string.
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 

    // shift removes the first element of an array and then toLowerCase changes it to lower case.
    const command = args.shift().toLowerCase();

    console.log('Environment: '+ env + '\nMessage: ' + message + '\nCommand: ' + command + '\nArguments: ' + args+ '\n---');
}