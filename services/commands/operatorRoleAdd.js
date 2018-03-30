'use strict'

const
    Discord = require("discord.js"),
    checkRoles = require('../tools/checkRoles')

const AllowedRoles = ["Male", "Female", "Femboy", "Trap", "Nonbinary", "Genderfluid", "Futa", "Straight", "Bisexual", "Bicurious", "Gay", "Lesbian", "Asexual", "Pansexual", "Kinkster", "Innocent", "Dom", "Sub", "Switch", "F", "D", "NH", "K", "Porn", "Events", "RPG"]
const AssignedRoles = []

module.exports = (client, message, args) => {

    //Establishes mentioned user
    var member = message.mentions.members.first();
 
    //Failure Conditions
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to add a role manually a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }
    
    if (AllowedRoles.includes(args[1])){
        member.addRoles(message.guild.roles.find("name", args[1]));

        const embed = new Discord.RichEmbed()
            .addField(`Manual Role Add`, `Operator <@${message.author.id}> added role ${args[1]} to user <@${member.id}> .`)
            .setColor(3066993)
            .setTimestamp()
            .setFooter("I've been a good girl, right..?", client.user.avatarURL);

        message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator manual role add. \n>>${err}`));


    }
    else message.author.send(`[ ${element} ] was not added to the user because it is not a permitted role. Remember, roles are case sensitive!`);
}