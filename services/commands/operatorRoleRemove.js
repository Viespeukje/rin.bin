'use strict'

const
    Discord = require("discord.js"),
    checkRoles = require('../tools/checkRoles')

const AllowedRoles = ["Uncharted", "Male", "Female", "Femboy", "Trap", "Nonbinary", "Genderfluid", "Futa", "Straight", "Bisexual", "Bicurious", "Gay", "Lesbian", "Asexual", "Pansexual", "Kinkster", "Innocent", "Dom", "Sub", "Switch", "F", "D", "NH", "K", "Porn", "Events", "RPG"]
const AssignedRoles = []

module.exports = (client, message, args) => {

    //Establishes mentioned user
    var member = message.mentions.members.first();
 
    //Failure Conditions
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to remove a role manually from a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }
    
    if (AllowedRoles.includes(args[1])){
        member.removeRole(message.guild.roles.find("name", args[1])).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to remove a role. \n>>${err}`));

        const embed = new Discord.RichEmbed()
            .addField(`Manual Role Removal`, `Operator <@${message.author.id}> removed role ${args[1]} from user <@${member.id}> .`)
            .setColor(15105570)
            .setTimestamp()
            .setFooter("I've been a good girl, right..?", client.user.avatarURL);

        message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator manual role removal. \n>>${err}`));


    }
    else message.author.send(`[ ${element} ] was not removed from the user because it is not a permitted role. Remember, roles are case sensitive!`);
}