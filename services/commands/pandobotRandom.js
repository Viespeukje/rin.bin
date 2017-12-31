'use strict'

const pandobotname = 'PandoBot'

module.exports = (client, message, env, chance) => {

    //Chance is the probability of this happening as a decimal.

    //PandobotRandom Restriction Lines
    //if(env === 'test') return; //Use this to limit the enviroment and avoid spam because it is accepting a prefixless input.
    if(message.author.bot = false) return; //Any NON bot inputs below this line will be ignored in case someone wants to change their name to PandoBot for some reason.

    if(message.author.username === pandobotname){

        let d = Math.random();
        if (d < (1-chance)) return;
        else message.channel.send("``PandoBot-senpai please notice me... :c``");
    }
    else return;
}