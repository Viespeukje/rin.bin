'use strict'

const
    Discord = require("discord.js"),
    checkRoles = require('../tools/checkRoles')

const AllowedRoles = ["Male", "Female", "Femboy", "Trap", "Nonbinary", "Genderfluid", "Futa", "Straight", "Bisexual", "Bicurious", "Gay", "Lesbian", "Asexual", "Pansexual"]
const AssignedRoles = []

module.exports = (client, message, args) => {

    //Establishes mentioned user
    var member = message.mentions.members.first();
 
    //Failure Conditions
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to mute a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }
    if(!checkRoles.isUncharted(member)){
        message.author.send("This user is not uncharted.");
        return;
    }
    else member.removeRole(message.guild.roles.find("name", "Uncharted")).catch(console.error);

    AssignedRoles.push(message.guild.roles.find("name", "Innocent"));
    AssignedRoles.push(message.guild.roles.find("name", "Kinkster"));

    args.forEach(function(element) {
    if (AllowedRoles.includes(element)) AssignedRoles.push(message.guild.roles.find("name", element));
    else console.log(`${element} was not added.`);
  });

    member.addRoles(AssignedRoles).catch(console.error);

    const embed = new Discord.RichEmbed()
        .addField(`Operator Mute`, `Operator <@${message.author.id}> approved user <@${member.id}> .`)
        .setColor(15844367)
        .setTimestamp()
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);


    message.guild.channels.find("name", "staff_lounge").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator mute. \n>>${err}`));
       
}