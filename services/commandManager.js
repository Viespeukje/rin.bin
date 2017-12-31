'use strict'

const 
    checkRoles = require('./checkRoles'),
    fetchRoles = require('./commands/fetchRoles'),
    pandobotRandom = require('./commands/pandobotRandom'),
    userHelp = require('./commands/userHelp'),
    userGems = require('./commands/userGems'),
    userSay = require('./commands/userSay'),
    userWarn = require('./commands/userWarn')

module.exports = (client, message, prefix, env) => {
    
    pandobotRandom(client, message, env, 0.01); //EasterEgg: Currently a .01 chance on pandobot message to reply.

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

    //ToDo: Handle the message deletion in another file maybe, and add permission rejection messages.

    if(command === "help") {
        message.delete().catch(O_o=>{});
        userHelp(client, message, prefix);
    }

    if(command === "rolecheck") {
        message.delete().catch(O_o=>{});
        if (checkRoles.isStaff(message.member) == false) return;

        //Yes, I know this looks awful. I'm too lazy to fix it right now.
        console.log(`Role Debug output for user: ${message.author.username}.`)
        console.log('BotOwner: ' + checkRoles.isBotOwner(message.member));  
        console.log('Owner: ' + checkRoles.isOwner(message.member));  
        console.log('Admin: ' + checkRoles.isAdmin(message.member));    
        console.log('Moderator: ' + checkRoles.isMod(message.member));    
        console.log('Staff: ' + checkRoles.isStaff(message.member));    
        console.log('Guide: ' + checkRoles.isGuide(message.member));   
    }
    if(command === "gems") {
        message.delete().catch(O_o=>{});
        if (checkRoles.isGuide(message.member) == false) return;
        userGems(client, message);
    }
    if(command === "say") {
        message.delete().catch(O_o=>{});
        if (checkRoles.isBotOwner(message.member) == false) return;
        userSay.normal(message, args);
    }
    if(command === "saycode") {
        message.delete().catch(O_o=>{});
        if (checkRoles.isBotOwner(message.member) == false) return;
        userSay.codebox(message, args);
    }
    if(command === "warn") {
        message.delete().catch(O_o=>{});
        if (checkRoles.isStaff(message.member) == false) return;
        userWarn(client, message);
    }

    //Debug line to output all of the raw commands the bot takes in.
   //console.log(`Environment: ${env}\nAuthor: ${message.author.username} (${message.author})\nMessage: ${message}\nCommand: ${command}\nArguments: ${args}\n---`);

}