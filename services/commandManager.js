'use strict'

const 
    checkRoles = require('./commands/checkRoles'),
    commandPermissions = require('./commandPermissions'),
    //pandobotRandom = require('./commands/pandobotRandom'),
    userHelp = require('./commands/userHelp'),
    userGems = require('./commands/userGems'),
    userSay = require('./commands/userSay'),
    userWarn = require('./commands/userWarn')

module.exports = (client, message, prefix, env) => {
    
    //pandobotRandom(client, message, env, 0.01); Currently disabled because it somehow fucks up **everything**

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
   
    if(!message.member) return;   //Any command that runs a role check MUST be below this line.




    //  All command permissions checks are managed using commandPermissions(message.member, command)
    //  for a full explanation, check commandPermissions.js

    if(command === "help") {
        message.delete().catch(O_o=>{});

        userHelp(client, message, prefix);
    }

    if(command === "rolecheck") {
        message.delete().catch(O_o=>{});
        if(!commandPermissions(message.member, command)) return;

        if (!message.mentions.users.first()) return;
        message.author.send(`Role Permissions Debug [${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}]\nisBotOwner = ${checkRoles.isBotOwner(message.mentions.members.first())}\nisOwner = ${checkRoles.isOwner(message.mentions.members.first())}\nisAdmin = ${checkRoles.isAdmin(message.mentions.members.first())}\nisMod = ${checkRoles.isMod(message.mentions.members.first())}\nisStaff = ${checkRoles.isStaff(message.mentions.members.first())}\nisGuide = ${checkRoles.isGuide(message.mentions.members.first())}`)
    }

    if(command === "gems") {
        message.delete().catch(O_o=>{});
        if(!commandPermissions(message.member, command)) return;

        userGems(client, message);
    }

    if(command === "say") {
        message.delete().catch(O_o=>{});
        if(!commandPermissions(message.member, command)) return;

        userSay.normal(message, args);
    }

    if(command === "saycode") {
        message.delete().catch(O_o=>{});
        if(!commandPermissions(message.member, command)) return;

        userSay.codebox(message, args);
    }

    if(command === "warn") {
        message.delete().catch(O_o=>{});
        if(!commandPermissions(message.member, command)) return;

        userWarn(client, message);
    }

    //Debug line to output all of the raw commands the bot takes in.
   //console.log(`Environment: ${env}\nAuthor: ${message.author.username} (${message.author})\nMessage: ${message}\nCommand: ${command}\nArguments: ${args}\n---`);

}