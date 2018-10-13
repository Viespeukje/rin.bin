'use strict'

const
    Discord = require("discord.js"),
    mongoTrophy = require('../database/mongoTrophy')

module.exports = async (client, message, args) => {

let member = message.mentions.users.first();
if(!member) member = message.author;

const embed = new Discord.RichEmbed()
  .setAuthor(`Trophy List for "${member.username}#${member.discriminator}"`, member.avatarURL)


const userData = await mongoTrophy.user(member.id); //Get all the trophyIDs
const trophyNumber = userData.trophyID.length; //Get the number of trophyIDs

var trophyListString = `${member} currently has the following trophies:`;
var loopCounter = 0;

userData.trophyID.forEach(async function(ID) {

  let trophyData = await mongoTrophy.about(ID); // Fetch the Trophy data for a given ID
  if (!trophyData) return; // If the data does not exist, return.
  
  embed.addField(`${trophyData.trophyName} [${trophyData.trophyID}]`,`${trophyData.trophyReason} *${trophyData.trophyRarity} Rarity.*`)
  //trophyListString += `\n${trophyData.trophyName} [${trophyData.trophyID}]` // Add the data to a list.

  loopCounter++; //Add 1 to a counter
  if(loopCounter === trophyNumber) message.guild.channels.find("name", "bot_commands").send({embed}); // If the counter = length, then do a thing.

});

}