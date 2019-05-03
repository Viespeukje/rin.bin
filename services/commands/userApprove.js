'use strict'

module.exports = (message) => {

    //Establishes mentioned user
    var member = message.mentions.users.first();
 
    //If var member is "falsy" and no users are mentioned, fail immediately.
    if(!member){
        console.log(`${message.author.username}#${message.author.discriminator} tried to approve a null user.`)
        message.author.send("Please mention a valid member of this server.");
        return;
    }
    //console.log(`${message.author.username}#${message.author.discriminator} approved user ${member.username}#${member.discriminator}.`)
    const embed = new Discord.RichEmbed()
            .addField(`Approval`, `<@${message.author.id}> approved user <@${member.id}> .`)
            .setColor(4886754)
            .setTimestamp()
            .setFooter("I made a new friend! <3", client.user.avatarURL);

        message.guild.channels.find("name", "operator_logs").send({embed}).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Tried to post an approval log. \n>>${err}`));
    message.channel.send(`Your intro has been approved, ${member}! You can now assign yourself access to additional channels in <#289902600701345792> by following the instructions. To start looking for RP partners, visit one of our partner search channels <#422021567502090259>. If you have any questions on how to get started, ask one of our lovely 'Admins,' 'Moderators,' or 'Operators' in the member list!`)

}