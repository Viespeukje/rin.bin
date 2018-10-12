'use strict'

//VERSION 1

//String variable. For instance "say" for command "/say"
const command = "help"; 
//String variable. ex "isUser"
const permissions = "isUser";
//Whether or not the commandmanager should run this command
const enabled = true;
//Help text string
const help = "This command will return a help dialogue that explains the commands available to that user with that user's permission level.";

const
    Discord = require("discord.js"),
    commandList = require('../commandManager'),
    checkRoles = require('../tools/checkRoles')

const run = function (params, message, args) {

    const commands = commandList.commandlist;

    var client = params.client;
    var prefix = params.prefix;

    const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(15844367)
        .setTitle("Hello! I'm Rin.bin!")
        .setDescription(`I am Rin's attempt at a chat bot and a project to learn some NodeJS. Please bear in mind that I'm still very much a work in progress, but both of us are doing our best. Based on your permissions, you are able to use the following commands...`)
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);

    Object.keys(commands).forEach(key => {
        let permlevel = commands[key].permissions;

        if (!checkRoles[permlevel](message.member)) return;
        else embed.addField(prefix + commands[key].command, commands[key].help);
    });

    message.author.send({ embed }).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Direct message send failed to user ${message.author.username}#${message.author.discriminator}. \n>>${err}`));
}

//Called if you need to initialize a command
const init = undefined


module.exports = {
    command: command,
    permissions: permissions,
    enabled: enabled,
    help: help,
    run: run,
    init: init
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