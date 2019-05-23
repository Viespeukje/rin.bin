'use strict'

const
    Discord = require("discord.js"),
    checkRoles = require('../tools/checkRoles')

//List of assignable roles
const AllowedRoles = ["Butch", "Tomboy", "Trans", "Male", "Female", "Femboy", "Trap", "Nonbinary", "Genderfluid", "Futa", "Straight", "Bisexual", "Bicurious", "Gay", "Lesbian", "Asexual", "Pansexual", "Dom", "Sub", "Switch"]
var AssignedRoles = []

module.exports = async (client, message, args) => {

   //Questionable line....?
   AssignedRoles.length = 0;

    //Establishes mentioned user
    var member = message.mentions.members.first();

    //Tries to fix uncharted issue...?
    var unchartedrole = await message.guild.roles.find("name", "Uncharted");
 
    //Failure Conditions
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to add roles to a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }

    //Remove the uncharted role no matter what.
    //member.removeRole(message.guild.roles.find("name", "Uncharted")).catch(console.error);

    args.shift();
console.log(unchartedrole);
    member.removeRole(unchartedrole).catch(console.error)

    //Always add these to the roles to be assigned
    AssignedRoles.push(await message.guild.roles.find("name", "Innocent"));
    AssignedRoles.push(await message.guild.roles.find("name", "Kinkster"));

    //Find and add each argument as a role to be added.
    args.forEach(function(element) {
        if (AllowedRoles.includes(element)) AssignedRoles.push(message.guild.roles.find("name", element));
        else message.author.send(`[ ${element} ] was not added to the user because it is not a permitted role. Remember, roles are case sensitive!`);
  });

    //Logging Dialogue
    const embed = new Discord.RichEmbed()
            .addField(`Approval`, `<@${message.author.id}> approved user <@${member.id}> .`)
            .setColor(4886754)
            .setTimestamp()
            .setFooter("I made a new friend! <3", client.user.avatarURL);

        message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an approval log. \n>>${err}`));
   
    //Add the roles
    member.addRoles(AssignedRoles).then(member.removeRole(unchartedrole).catch(console.error));

    //Welcome the user
    message.channel.send(`Your intro has been approved, ${member}! You can now assign yourself access to additional channels in <#289902600701345792> by following the instructions. To start looking for RP partners, visit one of our partner search channels <#551587687803387917>. If you have any questions on how to get started, ask one of our lovely 'Admins,' 'Moderators,' or 'Operators' in the member list!`);

}