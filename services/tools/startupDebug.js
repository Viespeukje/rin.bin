'use strict'

const general = function (prefix, env) {
    console.log('\x1b[34m%s\x1b[0m', `---\nRin.bin is now up and running.\nMy current command prefix is '${prefix}'.\nMy ${env} enviroment is currently active.\nPress Ctrl+C to terminate.\n---`);
}

const discord = function (client) {
    console.log('\x1b[34m%s\x1b[0m', `I am now connected to discord with ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.\n---`);
}

module.exports = {
    general: general,
    discord: discord
}