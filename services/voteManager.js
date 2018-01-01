'use strict'

const 
    permissionConfig = require('../permissionConfig')


module.exports = (reaction, user, prefix, env) => {

    const args = reaction.message.content //Makes array of args from message
        .trim()
        .split(/ +/g);
    
    let passPull = args.length - 6;
    let totalPull = args.length - 12;


    const votesTotal = args[totalPull];
    const votesPass = args[passPull];
    const votesFail = (votesTotal-votesPass)+1;

    console.log(`Total number of votes ${votesTotal}`);
    console.log(`Votes needed to pass ${votesPass}`);
    console.log(`Votes needed to fail ${votesFail}`);

console.log(reaction.message.reaction);


    //console.log(args);
    if(user.bot) return;
    console.log(`"${reaction.message}" ${reaction.emoji.name} was reacted to by ${user.username}#${user.discriminator}. ${reaction.count} users total.)`)
}
