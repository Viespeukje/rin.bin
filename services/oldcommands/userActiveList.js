'use strict'

const
    Discord = require("discord.js"),
    checkRoles = require('../tools/checkRoles'), 
    guildSearch = require('../tools/guildSearch')   


module.exports = async (client, message) => {

const memberList = [];
const exportList = [];

await message.guild.members.forEach( m => {

    //return if user has the role or another way to see the channel.
    if(checkRoles.isLewdster(m)) return;
    if(checkRoles.isKinkess(m)) return;
    if(!checkRoles.isKinkster(m)) return;
    if(checkRoles.isInnocent(m)) return;


    //return if the user is less than a month old.
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    if(d <= m.joinedAt) return;

    //return number of messages user has sent
    //guildSearch.messageCount(message.guild, m);

    memberList.push(m.user.username);
    exportList.push(m.user);

});

console.log(memberList);
message.channel.send(exportList)
}