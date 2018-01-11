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
    console.log(`${message.author.username}#${message.author.discriminator} approved user ${member.username}#${member.discriminator}.`)
    message.channel.send(`Your intro has been approved, ${member}! You can now assign yourself access to additional channels in <#289902600701345792> by following the instructions. To start looking for RP partners, visit <#286880584725299201>. If you have any questions on how to get started, ask one of the people listed under 'Guides' in the member list!`)

}