'use strict'

module.exports = (client, message) => {

    //Rin's To-Do List
    console.log('TO DO: Refine the way permissions are handled on the bot.')
    //Maybe have a little bit of dialogue that says something like "as a ROLE you are able to use the following commands..."

    message.delete().catch(O_o=>{});

    //Establishes mentioned user
    var member = message.mentions.users.first();

    //If the user lacks the appropriate role, fail.
    if(!message.member.roles.some(r=>["Admin", "Moderator", "Bot Testing"].includes(r.name)) ){
        console.log(`${message.author.username} attempted to generate a warning link for Failed due to lack of permissions.`);
        message.author.send("You lack the permissions to use this command.");
        return;
    }

    //If var member is "falsy" and no users are mentioned, fail immediately.
    if(!member){
        message.delete().catch(O_o=>{}); 
        console.log(`${message.author.username} attempted to generate a warning link for a null user.`);
        message.author.send("Please mention a valid member of this server.");
        return;
    }

    //Establishes the author of the message and the id of the member
    var staffmember = message.author;
    var memberID = member.id;

    //Establishes Date Variables
    var d = new Date();
    let dayvar = d.getDate();
    let monthvar = d.getMonth()+1; //Had to add a +1 because getMonth() returns 0-11
    let yearvar = d.getFullYear();

    //Getting usernames that aren't IDs to put in the table
    var staffstring = staffmember.username +'%23'+ staffmember.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.
    var memberstring = member.username +'%23'+ member.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.

    //Otherwise, send the appropriate link.
    if(member){
        //message.channel.send(' Staff Member: ' + staffstring + ' Target: ' + memberstring + ' TargetID: ' + memberID + ' Day: ' + yearvar+'-'+monthvar+'-'+dayvar);
        console.log(`${message.author.username} generated a warning link for user ${member.username}#${member.discriminator}.`);
        message.author.send(`Prefilled Link for User: ${member.username}\n\nhttps://docs.google.com/forms/d/e/1FAIpQLSc3ceOm39F1fdJq8VkmWEsJJW3rHXawaHoejP9G34xgX9GP4w/viewform?usp=pp_url&entry.640187248=${memberstring}&entry.867163136=${memberID}&entry.687949428=${staffstring}&entry.692760464=${yearvar}-${monthvar}-${dayvar}&entry.1364186442`);
    }
}