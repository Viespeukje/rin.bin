'use strict'

//VERSION 0;

const command = "";

const normal = function (message, args) {

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
    message.channel.send(sayMessage).catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message send failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));

}

const codebox = function (message, args) {

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
	message.channel.send("\`\`\`" + sayMessage + "\`\`\`").catch(err => console.log("\x1b[31m%s\x1b[0m", `ERROR: Message send failed in ${message.channel.name} when "${message}" was sent by ${message.author.username}#${message.author.discriminator}. \n>>${err}`));
}

module.exports = {
    normal: normal,
    codebox: codebox
}