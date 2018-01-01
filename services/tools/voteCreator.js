'use strict'

module.exports = (message, args) => {
    
    console.log(args);

    const voteCollect = args.shift();
    const voteEnd = args.shift();
    const voteMessage = args.join(" "); 

    message.channel.send(`${voteMessage}\nThis vote will end after ${voteCollect} votes have been logged. Needs ${voteEnd} votes in favor to pass.`)
        .then(function (message) {
                message.react("⭕")
                message.react("❌")
        })
        .catch(function(err) {
            console.log("\x1b[31m%s\x1b[0m", `SOMETHING went wrong with voting... voteCollect = "${voteCollect}", voteEnd = "${voteEnd}", voteMessage = "${voteMessage}". \n>>${err}`)
            message.delete(); //If somehow the bot fails to react,delete this message
        });

    
}