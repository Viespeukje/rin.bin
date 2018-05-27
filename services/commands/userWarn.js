'use strict'

const
    Discord = require("discord.js"),
    mongoInsert = require('../database/mongoInsert')
     

module.exports = async (client, message, env) => {
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
    let staffstring = staffmember.username.replace(/ /g,"%20") +'%23'+ staffmember.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.
    let memberstring = member.username.replace(/ /g,"%20") +'%23'+ member.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.

    // //Otherwise, send the appropriate link.
    // if(member){
    //     //message.channel.send(' Staff Member: ' + staffstring + ' Target: ' + memberstring + ' TargetID: ' + memberID + ' Day: ' + yearvar+'-'+monthvar+'-'+dayvar);
    //     console.log(`${message.author.username}#${message.author.discriminator} generated a warning link for user ${member.username}#${member.discriminator}.`);
    //     message.author.send(`Prefilled Link for User: ${member.username}\n\nhttps://docs.google.com/forms/d/e/1FAIpQLSc3ceOm39F1fdJq8VkmWEsJJW3rHXawaHoejP9G34xgX9GP4w/viewform?usp=pp_url&entry.640187248=${memberstring}&entry.867163136=${memberID}&entry.687949428=${staffstring}&entry.692760464=${yearvar}-${monthvar}-${dayvar}&entry.1364186442`);
    // }

    const warningCount = await mongoInsert.warningLog(memberID);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Warning Link for User "${member.username}#${member.discriminator}"`, member.avatarURL)

    //Add line for warnings, if applicable.
    if(warningCount == 1) embed.setColor(9807270)
    if(warningCount == 2) embed.addField(`Prior Warnings (ID: ${member.id})`,`One warning link has been generated for this user.`).setColor(15844367)
    if(warningCount == 3) embed.addField(`Prior Warnings (ID: ${member.id})`,`Two warning links have been generated for this user.`).setColor(15105570)
    if(warningCount >= 4) embed.addField(`Prior Warnings (ID: ${member.id})`,`Three or more  warning links have been generated for this user.`).setColor(15158332)

    //Add footer.
    if(member.id == "396062330397523968") embed.setFooter("But I've b-been a good girl... ;~;", client.user.avatarURL); //Rin.bin
    else if(member.id == "129052371702513664") embed.setFooter("Rin doesn't deserve that! D-does she?", client.user.avatarURL);//Rin
    else if(member.id == "318160447381569538") embed.setFooter("Rin won't be happy with me if I let you do that...", client.user.avatarURL); //Pandora
    else if(member.id == "313855265478803458") embed.setFooter("AritaBot is a hard worker but... she's a little mean to me...", client.user.avatarURL); //AritaBot
    else if(member.id == "327905220103503893") embed.setFooter("Aw, but... Chibi has always been so nice to me...", client.user.avatarURL);//Chibi
    else if(member.id == "172534517284732928") embed.setFooter("Arita has a nice bot too.. Do I have to?", client.user.avatarURL); //Arita
    else if(member.id == "312697858287468544") embed.setFooter("Tal seems like a nice person... What could he have done wrong?", client.user.avatarURL); //Tal
    else if(member.id == "291853266764038145") embed.setFooter("Poor blepper... go easy on her?", client.user.avatarURL); //Ally
    else if(member.id == "216185780173930496") embed.setFooter("B-but... those headpats... they were from a criminal all along?", client.user.avatarURL); //Fiendess
    else if(member.id == "140963430743015424") embed.setFooter("Don't make me warn pancakes, he'll get me all sticky...", client.user.avatarURL); //Pancakes
    else if(member.id == "279395206024003587") embed.setFooter("I think Rev could unplug me if he wanted to. I'm a little scared.", client.user.avatarURL); //Revvy
    else if(member.id == "341927044499636234") embed.setFooter("NO! I WON'T! You can't make me do this!", client.user.avatarURL); //Pandobot
    else embed.setFooter("I've been a good girl, right..?", client.user.avatarURL);
    
    //Easter Egg code for PandoBot
    if (member.username != "PandoBot") embed.addField('Click the link below to record a warning for this user...', `https://docs.google.com/forms/d/e/1FAIpQLSc3ceOm39F1fdJq8VkmWEsJJW3rHXawaHoejP9G34xgX9GP4w/viewform?usp=pp_url&entry.640187248=${memberstring}&entry.867163136=${memberID}&entry.687949428=${staffstring}&entry.692760464=${yearvar}-${monthvar}-${dayvar}&entry.1364186442\n`)
                                            .addField(`Click the link below to see all warnings recorded...`, `https://docs.google.com/spreadsheets/d/1PBd2cgpxZE9LdWqeEi39VY_2FOxGHPaGNy0l0bxs1i8/edit?usp=sharing`);

    if(env == "live") message.guild.channels.find("name", "staff_lounge").send(`**Warning Recorded**: ${staffmember} has just warned user ${member}.`).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Direct message send failed to user ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

    message.author.send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Direct message send failed to user ${message.author.username}#${message.author.discriminator}. \n>>${err}`));
}