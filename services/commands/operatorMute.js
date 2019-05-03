'use strict'

const
    Discord = require("discord.js")

module.exports = (client, message) => {

    //Establishes mentioned user
    var member = message.mentions.members.first();
 
    //Failure Conditions
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to mute a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }

    let role = message.guild.roles.find("name", "mute_chat");
    member.addRole(role);   

    //console.log(message.id)
    const embed = new Discord.RichEmbed()
        .addField(`Mute`, `<@${message.author.id}> muted user <@${member.id}> .`)
        .setColor(15158332)
        .setTimestamp()
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);


    message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator mute. \n>>${err}`));
    message.guild.channels.find("name", "staff_lounge").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator mute. \n>>${err}`));
   
}