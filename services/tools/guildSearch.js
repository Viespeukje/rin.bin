'use strict'

const messageCount = async function (guild, member) {

    await guild.channels.forEach( chan => {
        console.log(chan.name);
    // chan.fetchMessages({limit:100})
    //     .then(messages => console.log(`Received ${messages.size} messages in ${chan.name}.`))
    //     .catch(console.error);
    });

}

module.exports = {
    messageCount: messageCount
}

