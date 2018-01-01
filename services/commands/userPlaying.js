'use strict'

module.exports = (client, args) => {
    const playingmessage = args.join(" ");
    client.user.setGame(playingmessage);
}