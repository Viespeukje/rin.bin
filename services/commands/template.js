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

//A function for logging. Called immediately after Run if not undefined
const log = function(params, message, args) {

}

//Send information you need to initialize under ini. Called when registered.
const init = function(ini){

}

module.exports = {

}