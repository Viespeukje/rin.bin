'use strict'

const
    Discord = require("discord.js"),
    mongoTrophy = require('../database/mongoTrophy')

module.exports = (client, message, args) => {

    const rawArray = args.join(" ").split("|");  	// To get the "message" itself we join the `args` back into a string with spaces.

    var trophyName = rawArray[0];
    var trophyID = rawArray[1];
    var trophyRarity = rawArray[2];
    var trophyReason = rawArray[3];
    var trophyFlavor = rawArray[4];
    var trophyImage = rawArray[5];
    var trophyCreator = message.author.id;
    var trophyDate = message.createdAt;
    
    message.guild.channels.find("name", "trophy_log").send(`The following new ${trophyRarity} rarity trophy was created by <@${trophyCreator}> on ${trophyDate}\n\n**${trophyName}** [${trophyID}]\n\n${trophyReason}\n\n*${trophyFlavor}*\n\n${trophyImage}`);

    const trophyData = [trophyName, trophyID, trophyRarity, trophyReason, trophyFlavor, trophyImage, message.author.id, message.createdAt];

    mongoTrophy.create(trophyData)

    //Add a proper logging function
    //message.channel.send(sayMessage).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message send failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

}