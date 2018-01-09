'use strict'

const
    Discord = require("discord.js"),
    mongoInsert = require('../database/mongoInsert')
     

module.exports = async (client, message) => {

    //Establishes mentioned user
    let member = message.mentions.users.first();
 
    //If var member is "falsy" and no users are mentioned, fail immediately.
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} attempted to generate a warning link for a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }

    //Establishes the author of the message and the id of the member
    let staffmember = message.author;
    let memberID = member.id;

    //Establishes Date Variables
    let d = new Date();
    let dayvar = d.getDate();
    let monthvar = d.getMonth()+1; //Had to add a +1 because getMonth() returns 0-11
    let yearvar = d.getFullYear();

    //Getting usernames that aren't IDs to put in the table
    let staffstring = staffmember.username +'%23'+ staffmember.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.
    let memberstring = member.username +'%23'+ member.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.

    // //Otherwise, send the appropriate link.
    // if(member){
    //     //message.channel.send(' Staff Member: ' + staffstring + ' Target: ' + memberstring + ' TargetID: ' + memberID + ' Day: ' + yearvar+'-'+monthvar+'-'+dayvar);
    //     console.log(`${message.author.username}#${message.author.discriminator} generated a warning link for user ${member.username}#${member.discriminator}.`);
    //     message.author.send(`Prefilled Link for User: ${member.username}\n\nhttps://docs.google.com/forms/d/e/1FAIpQLSc3ceOm39F1fdJq8VkmWEsJJW3rHXawaHoejP9G34xgX9GP4w/viewform?usp=pp_url&entry.640187248=${memberstring}&entry.867163136=${memberID}&entry.687949428=${staffstring}&entry.692760464=${yearvar}-${monthvar}-${dayvar}&entry.1364186442`);
    // }

    const warningCount = await mongoInsert.warningLog(memberID);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Warning Link for User "${member.username}#${member.discriminator}"`, member.avatarURL)

    if(warningCount == 1) embed.setColor(9807270)
    if(warningCount == 2) embed.addField(`Prior Warnings`,`One warning link has been generated for this user.`).setColor(15844367)
    if(warningCount == 3) embed.addField(`Prior Warnings`,`Two warning links have been generated for this user.`).setColor(15105570)
    if(warningCount >= 4) embed.addField(`Prior Warnings`,`Three or more  warning links have been generated for this user.`).setColor(15158332)



        
        
    embed.addField('Click the link below to record a warning for this user...', `https://docs.google.com/forms/d/e/1FAIpQLSc3ceOm39F1fdJq8VkmWEsJJW3rHXawaHoejP9G34xgX9GP4w/viewform?usp=pp_url&entry.640187248=${memberstring}&entry.867163136=${memberID}&entry.687949428=${staffstring}&entry.692760464=${yearvar}-${monthvar}-${dayvar}&entry.1364186442\n`)
        .addField(`Click the link below to see all warnings recorded...`, `https://docs.google.com/spreadsheets/d/1PBd2cgpxZE9LdWqeEi39VY_2FOxGHPaGNy0l0bxs1i8/edit?usp=sharing`)
        .setFooter("I've been a good girl, right..?", client.user.avatarURL);


    message.author.send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Direct message send failed to user ${message.author.username}#${message.author.discriminator}. \n>>${err}`));
}