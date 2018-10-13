'use strict'

const
    Discord = require("discord.js"),
    mongoInsert = require('../database/mongoInsert')

module.exports = (client, message) => {

    //Establishes mentioned user
    var member = message.mentions.users.first();
 
    //If var member is "falsy" and no users are mentioned, fail immediately.
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to call a guide mute vote on a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }
    //console.log(message.id)
    const embed = new Discord.RichEmbed()
        .setAuthor(`Guide Vote to mute user: ${member.username}#${member.discriminator}`, member.avatarURL)
        .setColor(15844367)
        .addField(`If you believe that this user should be muted, vote 👍.`, `This is a vote that will mute a user if the number of positive reactions applied reaches 3. \nIt will fail if the number of negative reactions applied reaches 2.`)
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);
    message.channel.send({embed})
        .then(function (message) {
        message.react("👍")
        message.react("👎")
        mongoInsert.guideMute(message.id, member.id);
        //console.log(message.id) //SHOULD be different
        }).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Voting embed creation failed. \n>>${err}`));

}