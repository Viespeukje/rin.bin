'use strict'

const
    Discord = require("discord.js"),
    checkRoles = require('../tools/checkRoles')

const AllowedRoles = ["Male", "Female", "Femboy", "Trap", "Nonbinary", "Genderfluid", "Futa", "Straight", "Bisexual", "Bicurious", "Gay", "Lesbian", "Asexual", "Pansexual", "Dom", "Sub", "Switch"]
const AssignedRoles = []

module.exports = (client, message, args) => {

    //Establishes mentioned user
    var member = message.mentions.members.first();
 
    //Failure Conditions
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to add roles to a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }
    // if(!checkRoles.isUncharted(member)){
    //     message.author.send("This user is not uncharted.");
    //     return;
    // }
    args.shift();

    AssignedRoles.push(message.guild.roles.find("name", "Innocent"));
    AssignedRoles.push(message.guild.roles.find("name", "Kinkster"));

    args.forEach(function(element) {
        if (AllowedRoles.includes(element)) AssignedRoles.push(message.guild.roles.find("name", element));
        else message.author.send(`[ ${element} ] was not added to the user because it is not a permitted role. Remember, roles are case sensitive!`);
  });

    member.addRoles(AssignedRoles).catch(console.error);
    message.channel.send(`Your intro has been approved, ${member}! You can now assign yourself access to additional channels in <#289902600701345792> by following the instructions. To start looking for RP partners, visit one of our partner search channels <#422021567502090259>. If you have any questions on how to get started, ask one of our lovely 'Admins,' 'Moderators,' or 'Operators' in the member list!`)

    if(checkRoles.isUncharted(member)){
        member.removeRole(message.guild.roles.find("name", "Uncharted")).catch(console.error);
    }

    const embed = new Discord.RichEmbed()
        .addField(`Operator Approve`, `Operator <@${message.author.id}> approved user <@${member.id}> .`)
        .setColor(3066993)
        .setTimestamp()
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);

    message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an operator mute. \n>>${err}`));

}