'use strict'

//VERSION -This is the revision of the command. Cptn put this here so he can tell if he updated a command already.

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------IF YOU DON'T REGISTER THIS IT WON'T WORK. REGISTER IT. PLEASE GOD.------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
-----------------------------------------------------------------------------*/

//String variable. For instance "say" for command "/say"
const command = "playing"; 
//String variable. ex "isUser"
const permissions = "isBotOwner";
//Whether or not the commandmanager should run this command
const enabled = true;
//Help text string
const help = "This command will change my 'now playing' message.";

//What to do when someone runs the function. Will only get this far if user has permissions
const run = function (params, message, args) {
    const playingmessage = args.join(" ");
    params.client.user.setGame(playingmessage);
}

/*Params is an object with the given values

params = {
    client: the discord client
    env: the enviroment
    prefix: previx the bot is using
}

*/

//Called if you need to initialize a command
const init = undefined


module.exports = {
    command: command,
    permissions: permissions,
    enabled: enabled,
    help: help,
    run: run,
    init: init
}