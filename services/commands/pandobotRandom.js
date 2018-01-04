'use strict'

const pandobotname = 'PandoBot' //Defines the username this command is reacting to.

module.exports = (client, message, env, chance) => {

    //Chance is the probability of this happening as a decimal.

    //PandobotRandom Restriction Lines
    if(message.author.bot = false) return; //Any NON bot inputs below this line will be ignored in case someone wants to change their name to PandoBot for some reason.
    
    //Random Chance Lines
    if(message.author.username === pandobotname){
        let d = Math.random();
        if (d < (1-chance)) return; //there is a (1 - chance)*100 % chance to send this line of dialogue.
        else message.channel.send("``PandoBot-senpai please notice me... :c``");
    }
    else return;
}