//VERSION -This is the revision of the command. Cptn put this here so he can tell if he updated a command already.

//String variable. For instance "say" for command "/say"
const command = null; 
//String variable. ex "isUser"
const permissions = null
//Whether or not the commandmanager should run this command
const enabled = false;
//Help text string
const help = null;

//What to do when someone runs the function. Will only get this far if user has permissions
const run = function (params, message, args) {
    return;
}

/*Params is an object with the given values

params = {
    client: the discord client
    env: the enviroment
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