'use strict'

const
    Discord = require("discord.js")

module.exports = (client, message) => {
    
    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .addField(`Channel Reset Notification`, `The previous roleplay is finished, or has expired (6+ hours). This post marks the beginning of a new one.\n\nThe first post after this gets to set the foundation. Anyone who wishes to join in should read through the ongoing roleplay before doing so.`)
    .setColor(9807270)
    .setTimestamp()
    .setFooter("I've been a good girl, right..?", client.user.avatarURL);
message.channel.send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator reset. \n>>${err}`));
   

    // //console.log(message.id)
    // const embed = new Discord.RichEmbed()
    //     .addField(`Operator Reset`, `Operator <@${message.author.id}> reset channel ${message.channel}.`)
    //     .setColor(9807270)
    //     .setTimestamp()
    //     .setFooter("I've been a good girl, right..?", client.user.avatarURL);
    // message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator reset. \n>>${err}`));
       
}