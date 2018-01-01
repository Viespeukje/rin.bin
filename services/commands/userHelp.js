'use strict'

const 
    Discord = require("discord.js"),
    commandList = require('../../commandList'),
    checkRoles = require('./checkRoles'),
    util = require('util')
    
module.exports = (client, message, prefix) => {

  const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(15844367)
        .setTitle("Hello! I'm Rin.bin!")
        .setDescription(`I am Rin's attempt at a chat bot and a project to learn some NodeJS. Please bear in mind that I'm still very much a work in progress, but both of us are doing our best. Based on your permissions, you are able to use the following commands...`)
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);
    
commandList.commands.forEach(function(commandEntries){
    //If you do not pass the permissions check required in the commandList file, this will fail.
    if(commandEntries.permissions == "isBotOwner" && !checkRoles.isBotOwner(message.member)) return;
    if(commandEntries.permissions == "isOwner" && !checkRoles.isOwner(message.member)) return;
    if(commandEntries.permissions == "isAdmin" && !checkRoles.isAdmin(message.member)) return;
    if(commandEntries.permissions == "isMod" && !checkRoles.isMod(message.member)) return;
    if(commandEntries.permissions == "isStaff" && !checkRoles.isStaff(message.member)) return;
    if(commandEntries.permissions == "isGuide" && !checkRoles.isGuide(message.member)) return;

    //Add the name and description provided in the commandList file
    return embed.addField(`${prefix}${commandEntries.name}`, commandEntries.description);
});
    console.log(`${message.author.username} has requested a help dialogue.`);
    message.author.send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Direct message send failed to user ${message.author.username}#${message.author.discriminator}. \n>>${err}`));
}

// POSSIBLE COLORS IN DISCORD

// DEFAULT: 0,
// AQUA: 1752220,
// GREEN: 3066993,
// BLUE: 3447003,
// PURPLE: 10181046,
// GOLD: 15844367,
// ORANGE: 15105570,
// RED: 15158332,
// GREY: 9807270,
// DARKER_GREY: 8359053,
// NAVY: 3426654,
// DARK_AQUA: 1146986,
// DARK_GREEN: 2067276,
// DARK_BLUE: 2123412,
// DARK_PURPLE: 7419530,
// DARK_GOLD: 12745742,
// DARK_ORANGE: 11027200,
// DARK_RED: 10038562,
// DARK_GREY: 9936031,
// LIGHT_GREY: 12370112,
// DARK_NAVY: 2899536