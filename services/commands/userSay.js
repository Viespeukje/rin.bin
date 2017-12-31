'use strict'

const normal = function (message, args) {

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
    message.channel.send(sayMessage);

}

const codebox = function (message, args) {

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
	message.channel.send("\`\`\`" + sayMessage + "\`\`\`");
}

module.exports = {
    normal: normal,
    codebox: codebox
}