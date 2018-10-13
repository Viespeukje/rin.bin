'use strict'

const commandlist = new Array();
const commandPermissions = require('./commandPermissions');

/*const 
    checkRoles = require('./tools/checkRoles'),
    commandPermissions = require('./commandPermissions'),
    commandList = require('../commandList'),
    userHelp = require('./commands/userHelp'),
    userPlaying = require('./commands/userPlaying'),
    userGems = require('./commands/userGems'),
    userApprove = require('./commands/userApprove'),
    userGuideMute = require('./commands/userGuideMute'),
    operatorRoleAdd = require('./commands/operatorRoleAdd'),
    operatorRoleRemove = require('./commands/operatorRoleRemove'),
    operatorMute = require('./commands/operatorMute'),
    operatorReset = require('./commands/operatorReset'),
    operatorApprove = require('./commands/operatorApprove'),
    userActiveList = require('./commands/userActiveList'),
    trophyNew = require('./commands/trophyNew'),
    trophyAbout = require('./commands/trophyAbout'),
    trophyGive = require('./commands/trophyGive'),
    trophyList = require('./commands/trophyList'),
    trophyRoleGive = require('./commands/trophyRoleGive'),
    userSay = require('./commands/userSay'),
    userWarn = require('./commands/userWarn'),
    checkSpam = require('./tools/checkSpam'),
    userWarnCount = require('./commands/userWarnCount')
    */

const init = function (){
    console.log("Adding commands to the command manager... You did make sure to register your new commands, right?");

    addCommand(require('./commands/userHelp'));
    addCommand(require('./commands/userSay'));
    addCommand(require('./commands/userCodeSay'));
    addCommand(require('./commands/userPlaying'));
    
    console.log("Added " + commandlist.length + " commands!");
}

const addCommand = function(cmd){
    commandlist.push(cmd);
}

const onMessage = (client, message, prefix, env) => {


    if(message.author.bot) return; //Any bot inputs below this line will be ignored.

    /*TEMP CHANGE
    if(checkRoles.isUncharted(message.member)){
        if(message.mentions.roles.first()) checkSpam.spamAdd(client, message, env);
        else if(message.mentions.members.first()) checkSpam.spamAdd(client, message, env);
        else checkSpam.spamClear(client, message, env);
    }
    */

    if(message.content
        .indexOf(prefix) !== 0) return; //Any inputs below this line that do not begin with the prefix will be ignored

    const args = message.content //Makes array of args from message
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args //Defines command as the first arg, but lower case
        .shift()
        .toLowerCase();

    const params = {
        client: client,
        env: env,
        prefix: prefix
    }
   
    if(!message.member) return;   //Any command that runs a role check MUST be below this line.

    //  All command permissions checks are managed using commandPermissions(message.member, command)
    //  for a full explanation, check commandPermissions.js

    //Loop through the commands and if they're not disabled, run them. If you run a command return because any command beyond that point is the wrong one.
    for (var i = 0; i < commandlist.length; i++){
        //First find the command, only checking enabled commands.
        if (commandlist[i].enabled && commandlist[i].command == command){
            //Great. We found the command. Now make sure we have permissions.
            if(commandPermissions(message.member, commandlist[i].permissions)){
                commandlist[i].run(params, message, args);
            } else {
                //If you want to log invalid use of a command people shouldn't have, do it here.
            }
            message.delete();
            return;
        }
    }
}

module.exports = {
    init: init,
    onMessage: onMessage,
    commandlist: commandlist
}

/*
    if(commandList[command]) message.delete().catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message deletion failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));


    if(command === "help") {
        userHelp(client, message, prefix);
    }

    if(command === "givemod") {
        //Assigns the moderator role to a user.
        if(!commandPermissions(message.member, command)) return;
        if (!message.mentions.users.first()) return;
        message.member.addRoles(message.guild.roles.find("name", "Moderator"));
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

    // if(command === "guidemute") {
    //     if(!commandPermissions(message.member, command)) return;

    //     userGuideMute(client, message);
    // }

    if(command === "radd") {
        if(!commandPermissions(message.member, command)) return;

        operatorRoleAdd(client, message, args);
    }
    if(command === "rremove") {
        if(!commandPermissions(message.member, command)) return;

        operatorRoleRemove(client, message, args);
    }

    if(command === "opapprove") {
        if(!commandPermissions(message.member, command)) return;

        operatorApprove(client, message, args);
    }

    if(command === "opmute") {
        if(!commandPermissions(message.member, command)) return;

        operatorMute(client, message);
    }

    if(command === "opreset") {
        if(!commandPermissions(message.member, command)) return;

        operatorReset(client, message);
    }

    if(command === "a") {
        if(message.guild.id != "279584314856046592") return;
        if(!commandPermissions(message.member, command)) return;

        userApprove(message);
    }

    if(command === "say") {
        if(!commandPermissions(message.member, command)) return;

        userSay.normal(message, args);
    }

    if(command === "saycode") {
        if(!commandPermissions(message.member, command)) return;

        userSay.codebox(message, args);
    }

    if(command === "activelist") {
        if(!commandPermissions(message.member, command)) return;

        userActiveList(client, message);
    }

    if(command === "warn") {
        if(!commandPermissions(message.member, command)) return;

        userWarn(client, message, env);
    }

    if(command === "warncount") {
        if(!commandPermissions(message.member, command)) return;

        userWarnCount(client, message, args, env);
    }

    if(command === "trophynew") {
        if(!commandPermissions(message.member, command)) return;

        trophyNew(client, message, args);
    }
    if(command === "trophyabout") {
        if(!commandPermissions(message.member, command)) return;

        trophyAbout(client, message, args);
    }
    if(command === "trophygive") {
        if(!commandPermissions(message.member, command)) return;

        trophyGive(client, message, args);
    }
    if(command === "trophies") {
        if(!commandPermissions(message.member, command)) return;

        trophyList(client, message, args);
    }
    if(command === "role2trophy") {
        if(!commandPermissions(message.member, command)) return;

        trophyRoleGive(client, message, args);
    }
}*/