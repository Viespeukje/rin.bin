'use strict'

const
    Discord = require("discord.js"),
    mongoInsert = require('../database/mongoInsert')
     

module.exports = async (client, message, args) => {
     //Establishes mentioned user
     let member = message.mentions.users.first();
 
     //If var member is "falsy" and no users are mentioned, fail immediately.
     if(!member){
         console.log(`${message.author.username}#${message.author.discriminator} attempted to generate a warning link for a null user.`)
         message.author.send("Please mention a valid member of this server.");
         return;
     }

    if(!args[1]){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to change the warning count without entering a number.`)
        message.author.send("Please give a number when trying to set a warning count to a number. ``+warn @user #``");
        return;
    }
    else {
        await mongoInsert.warningCount(member.id, args[1]);
        if(env == "live") message.guild.channels.find("name", "staff_lounge").send(`**Warning Counter Change**: ${message.author} has just set the warning counter for user ${member} to ${args[1]}`).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Direct message send failed to user ${message.author.username}#${message.author.discriminator}. \n>>${err}`));
    }
}