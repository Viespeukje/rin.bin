'use strict'

const 
    Discord = require("discord.js"),
    commandList = require('../../commandList'),
    checkRoles = require('../checkRoles'),
    util = require('util')
    
module.exports = (client, message, prefix) => {


    console.log(`${message.author.username} has been sent the help dialogue.`);

    const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(15844367)
        .setTitle("Hello! I'm Rin.bin!")
        .setDescription(`I am Rin's attempt at a chat bot and a project to learn some NodeJS. Please bear in mind that I'm still very much a work in progress, but both of us are doing our best. Based on your permissions, you are able to use the following commands...`)
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);
    
    embed.addField(prefix+commandList.help.name, commandList.help.description);

    if (checkRoles.isBotOwner(message.member)){
        //Commands that BotOwner can see.
        embed.addField(prefix+commandList.say.name, commandList.say.description);
    }

    if (checkRoles.isBotOwner(message.member) || checkRoles.isOwner(message.member) ){
        //Commands that BotOwner and Owner can see.
        //No current Owner+ commands.
    }

    if (checkRoles.isBotOwner(message.member || checkRoles.isAdmin(message.member))){
        //Commands that BotOwner and Admin can see.
        //No current Admin+ commands.
    }

    if (checkRoles.isBotOwner(message.member) || checkRoles.isStaff(message.member)){
        //Commands that BotOwner and Staff can see.
        embed.addField(prefix+commandList.warn.name, commandList.warn.description);
        embed.addField(prefix+commandList.rolecheck.name, commandList.rolecheck.description);
    }

    if (checkRoles.isBotOwner(message.member) || checkRoles.isGuide(message.member) ){
        //Commands that BotOwner and any roles defined under "isGuide" can see.
        embed.addField(prefix+commandList.gems.name, commandList.gems.description);
    }

    //Commands anyone can see.

    message.author.send({embed});

















    // message.author.send({embed: {
    //     color: 15844367,
    //     author: {
    //       name: client.user.username,
    //       icon_url: client.user.avatarURL
    //     },
    //     title: "Hello! I'm Rin.bin!",
    //     description: "Basically I'm Rin's attempt at a chat bot and a project to learn some NodeJS. My commands are as follows...\n",
    //     fields: [
    //     {
    //         name: prefix + "help",
    //         value: "I hope you know how this one works considering you opened this menu.\n"
    //     },
    //     {
    //         name: prefix + "gems",
    //         value: "This command will cause me to post a primer on how gems on the server work. \n*Guide permissions required.*\n"
    //     },
    //     {
    //         name: prefix + "warn",
    //         value: "This command is used to warn the first user mentioned after the command. If no users are mentioned, it will fail. If more than one user is mentioned, the link will be generated for the first one only.\n*Moderator permissions required.*\n"
    //     },
    //     {
    //         name: prefix + "say",
    //         value: "This command will cause me to delete your message and repeat it myself. The command *saycode* will put the text in a codebox.\n*Moderator permissions required.*\n"
    //     }
    //     ],
    //     //timestamp: new Date(),
    //     footer: {
    //       icon_url: client.user.avatarURL,
    //       text: "I've been a good girl, right..?"
    //     }
    //   }
    // });
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