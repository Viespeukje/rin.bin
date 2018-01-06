'use strict'
const
    Discord = require("discord.js"),
    voteEval = require('./tools/voteEval') //Evaluate Votes


module.exports = (client, reaction, voteInfo, env) => {

    if (voteEval[voteInfo.voteType](reaction, voteInfo) == "pending") return;
    else if (voteEval[voteInfo.voteType](reaction, voteInfo) == "fail"){
        reaction.message.delete();
        reaction.message.channel.send(`Mute vote for <@${voteInfo.memberid}> failed.`).then(function(message) {
            var member = message.mentions.users.first();
            message.delete()
            const embed = new Discord.RichEmbed()
            .setAuthor(`Mute vote failed for user ${member.username}#${member.discriminator}`, member.avatarURL)
            .setColor(15844367)
            .setFooter("I've been a good girl, right..?", client.user.avatarURL);
            reaction.message.channel.send({embed})
          });
    }
    else if (voteEval[voteInfo.voteType](reaction, voteInfo) == "pass") {
        reaction.message.delete();
        reaction.message.channel.send(`Mute vote for <@${voteInfo.memberid}> passed.`).then(function(message) {
            var member = message.mentions.users.first();
            message.delete()
            const embed = new Discord.RichEmbed()
            .setAuthor(`Mute vote passed for user ${member.username}#${member.discriminator}`, member.avatarURL)
            .setColor(15844367)
            .setFooter("I've been a good girl, right..?", client.user.avatarURL);
            reaction.message.channel.send({embed})
          });

        //insert code to kick user here.
    }
    else return;


}