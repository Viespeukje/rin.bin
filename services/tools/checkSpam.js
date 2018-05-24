'use strict'

const
    Discord = require("discord.js"),
    mongoInsert = require('../database/mongoInsert')
     

const spamAdd =  async (client, message, env) => {

const spamCount = await mongoInsert.spamLog(message.member.id);

if(spamCount == 1) console.log('Spamwarn');
if(spamCount == 2) message.author.send('Repeatedly spam mentioning people or roles as an uncharted user will result in an automated ban.').catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Failed to send spam warning message to user. \n>>${err}`));
if(spamCount >= 3) {
message.author.send('You have been banned for repeatedly mentioning users or roles. If you would like to contest this, please contact a staff member.').catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Failed to send spam ban message to user. \n>>${err}`));
message.member.ban('AutoBanned for Uncharted Mention Spam.');

    const embed = new Discord.RichEmbed()
    .addField(`Spammer Ban`, `Uncharted User ${message.member} was banned for repeated spam.`)
    .setColor(15158332)
    .setTimestamp()
    .setFooter("I've been a good girl, right..?", client.user.avatarURL);


message.guild.channels.find("name", "staff_lounge").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post autoban message. \n>>${err}`));

}
};

const spamClear =  async (client, message, env) => {

mongoInsert.spamClear(message.member.id);
console.log (`spam cleared`)
};
module.exports = {
    spamAdd: spamAdd,
    spamClear: spamClear
}