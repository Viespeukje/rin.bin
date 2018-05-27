'use strict'

const
    Discord = require("discord.js"),
    mongoTrophy = require('../database/mongoTrophy')

module.exports = async (client, message, args) => {

    let member = message.mentions.users.first();
    console.log(args[1]);
    
    const trophyData = await mongoTrophy.about(args[1]);
    
    if(!trophyData) return; //If the record is not found, then do nothing.
    else{
        mongoTrophy.give(member.id, args[1]);
    }


    if(trophyData.trophyRarity == "Legendary") var rarityColor = "15844367"
    else if(trophyData.trophyRarity == "Epic") var rarityColor = "10181046"
    else if(trophyData.trophyRarity == "Rare") var rarityColor = "3447003"
    else if(trophyData.trophyRarity == "Uncommon") var rarityColor = "3066993"
    else if(trophyData.trophyRarity == "Common") var rarityColor = "0"
    else if(trophyData.trophyRarity == "Stupidly Common") var rarityColor = "12370112"
    else if(trophyData.trophyRarity == "Fuck You") var rarityColor = "15158332"
    else var rarityColor = "0"

    message.channel.send(`${member} has been assigned a new trophy by ${message.author}!`)
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


    // //Display that a trophy was earned.



    // const rawArray = args.join(" ").split("|");  	// To get the "message" itself we join the `args` back into a string with spaces.

    // var trophyName = rawArray[0];
    // var trophyID = rawArray[1];
    // var trophyRarity = rawArray[2];
    // var trophyReason = rawArray[3];
    // var trophyFlavor = rawArray[4];
    // var trophyImage = rawArray[5];
    // var trophyCreator = message.author.id;
    // var trophyDate = message.createdAt;
    
    // // message.channel.send(`The following new ${trophyRarity} rarity trophy was created by <@${trophyCreator}> on ${trophyDate}\n\n**${trophyName}** [${trophyID}]\n\n${trophyReason}\n\n*${trophyFlavor}*\n\n${trophyImage}`);

    // const trophyData = [trophyName, trophyID, trophyRarity, trophyReason, trophyFlavor, trophyImage, message.author.id, message.createdAt];

    // mongoTrophy.create(trophyData)

    // //Add a proper logging function
    // //message.channel.send(sayMessage).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message send failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

}