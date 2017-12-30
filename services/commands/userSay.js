'use strict'

const normal = function (message, args) {

    message.delete().catch(O_o=>{}); 

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
    
    //Block of code to delete and then ignore the command if someone without the appropriate roles tries to use it.
    if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) ){ 
        console.log(message.author.username +' attempted to make me say \"'+sayMessage+'\". Failed due to lack of permissions.');
        return; 
    }

    else message.channel.send(sayMessage);
}

const codebox = function (message, args) {

    message.delete().catch(O_o=>{}); 

    const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
		
    //Block of code to delete and then ignore the command if someone without the appropriate roles tries to use it.
    if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) ){ 
        console.log(message.author.username +' attempted to make me say \"'+sayMessage+'\" in a codebox. Failed due to lack of permissions.');
        return; 
    }

    else message.channel.send("\`\`\`" + sayMessage + "\`\`\`");
}

module.exports = {
    normal: normal,
    codebox: codebox
}