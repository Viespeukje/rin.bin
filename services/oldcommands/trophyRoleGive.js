'use strict'

const
    Discord = require("discord.js"),
    mongoTrophy = require('../database/mongoTrophy')

module.exports = async (client, message, args) => {

  const rawArray = args.join(" ").split("|");
  let roleGive = rawArray[0];
  let trophyGet = rawArray[1];

  const memberList = message.guild.roles.find("name", roleGive).members; 
  const trophyData = await mongoTrophy.about(trophyGet);
    
  if(!trophyData) return; //If the record is not found, then do nothing.

    memberList.forEach(function(member) {
    mongoTrophy.give(member.id, trophyGet);


    if(trophyData.trophyRarity == "Legendary") var rarityColor = "15844367"
    else if(trophyData.trophyRarity == "Epic") var rarityColor = "12390624"
    else if(trophyData.trophyRarity == "Rare") var rarityColor = "4886754"
    else if(trophyData.trophyRarity == "Uncommon") var rarityColor = "8311585"
    else if(trophyData.trophyRarity == "Common") var rarityColor = "16777215"
    else if(trophyData.trophyRarity == "Stupidly Common") var rarityColor = "10197915"
    else if(trophyData.trophyRarity == "Fuck You") var rarityColor = "13632027"
    else var rarityColor = "16777215"

    message.channel.send(`${member} has been assigned the ${trophyData.trophyName} trophy by ${message.author}!`).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Role2trophy Embed DM failed for user ${member.user.username}#${member.user.discriminator}.`));
    member.send({
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
      }).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Role2trophy Embed DM failed for user ${member.user.username}#${member.user.discriminator}.`));

    });


    //-------


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