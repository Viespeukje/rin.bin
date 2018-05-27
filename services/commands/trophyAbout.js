'use strict'

const
    Discord = require("discord.js"),
    mongoTrophy = require('../database/mongoTrophy')

module.exports = async (client, message, args) => {

const trophyData = await mongoTrophy.about(args[0]);

if(!trophyData) return; //If the record is not found, then do nothing.

console.log(trophyData.trophyName);

if(trophyData.trophyRarity == "Legendary") var rarityColor = "15844367"
else if(trophyData.trophyRarity == "Epic") var rarityColor = "12390624"
else if(trophyData.trophyRarity == "Rare") var rarityColor = "4886754"
else if(trophyData.trophyRarity == "Uncommon") var rarityColor = "8311585"
else if(trophyData.trophyRarity == "Common") var rarityColor = "16777215"
else if(trophyData.trophyRarity == "Stupidly Common") var rarityColor = "10197915"
else if(trophyData.trophyRarity == "Fuck You") var rarityColor = "13632027"
else var rarityColor = "16777215"

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

message.channel.send({
    "content": `The following trophy was found with the ID ${trophyData.trophyID}.`,
    "embed": {
      "title": `${trophyData.trophyName}`,
      "description": `${trophyData.trophyReason} \n\n*${trophyData.trophyFlavor}*`,
      "color": rarityColor,
      "timestamp": trophyData.trophyDate,
      "footer": {
        "icon_url": client.user.avatarURL,
        "text": `[${trophyData.trophyID}] ${trophyData.trophyRarity} Rarity`
      },
      "thumbnail": {
        "url": trophyData.trophyImage
      }
    }
  });
    // message.channel.send(`The following new ${trophyRarity} rarity trophy was created by <@${trophyCreator}> on ${trophyDate}\n\n**${trophyName}** [${trophyID}]\n\n${trophyReason}\n\n*${trophyFlavor}*\n\n${trophyImage}`);

    //Add a proper logging function
    //message.channel.send(sayMessage).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message send failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

}