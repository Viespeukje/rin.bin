'use strict'

//VERSION 1;

const command = "say";
const permissions = "isBotOwner";
const enabled = true;
const help = "This command will cause me to delete your message and repeat it myself.";

const run = function (params, message, args) {

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
    message.channel.send(sayMessage).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message send failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

}

const init = undefined;

module.exports = {
    command: command,
    permissions: permissions,
    enabled: enabled,
    help: help,
    run: run,
    init: init
}