'use strict'

const 
    checkRoles = require('./tools/checkRoles'),
    commandPermissions = require('./commandPermissions'),
    commandList = require('../commandList'),
    userHelp = require('./commands/userHelp'),
    userPlaying = require('./commands/userPlaying'),
    userGems = require('./commands/userGems'),
    userGuideMute = require('./commands/userGuideMute'),
    userSay = require('./commands/userSay'),
    userWarn = require('./commands/userWarn')

module.exports = (client, message, prefix, env) => {
    
    if(message.author.bot) return; //Any bot inputs below this line will be ignored.

    if(message.content
        .indexOf(prefix) !== 0) return; //Any inputs below this line that do not begin with the prefix will be ignored

    const args = message.content //Makes array of args from message
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args //Defines command as the first arg, but lower case
        .shift()
        .toLowerCase();
   
    if(!message.member) return;   //Any command that runs a role check MUST be below this line.

    //  All command permissions checks are managed using commandPermissions(message.member, command)
    //  for a full explanation, check commandPermissions.js


    if(commandList[command]) message.delete().catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message deletion failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

    if(command === "help") {
        userHelp(client, message, prefix);
    }

    if(command === "rolecheck") {
        if(!commandPermissions(message.member, command)) return;

        if (!message.mentions.users.first()) return;
        message.author.send(`Role Permissions Debug [${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}]\nisBotOwner = ${checkRoles.isBotOwner(message.mentions.members.first())}\nisOwner = ${checkRoles.isOwner(message.mentions.members.first())}\nisAdmin = ${checkRoles.isAdmin(message.mentions.members.first())}\nisMod = ${checkRoles.isMod(message.mentions.members.first())}\nisStaff = ${checkRoles.isStaff(message.mentions.members.first())}\nisGuide = ${checkRoles.isGuide(message.mentions.members.first())}`)
    }

    if(command === "aboutgems") {
        if(!commandPermissions(message.member, command)) return;

        userGems(client, message);
    }

    if(command === "guidemute") {
        if(!commandPermissions(message.member, command)) return;

        userGuideMute(client, message);
    }

    if(command === "playing") {
        if(!commandPermissions(message.member, command)) return;

        userPlaying(client, args);
    }

    if(command === "say") {
        if(!commandPermissions(message.member, command)) return;

        userSay.normal(message, args);
    }

    if(command === "saycode") {
        if(!commandPermissions(message.member, command)) return;

        userSay.codebox(message, args);
    }

    if(command === "warn") {
        if(!commandPermissions(message.member, command)) return;

        userWarn(client, message);
    }
}